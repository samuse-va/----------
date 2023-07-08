import { isEscEvent } from './util.js'

const MAX_DESCRIPTION_LENGTH = 140
const HASH = '#'
const MAX_HASHTAG_LENGTH = 20
const MAX_NUMBER_HASHTAGS = 5

const hashtagsInput = document.querySelector('.text__hashtags')
const descriptionInput = document.querySelector('.text__description')


hashtagsInput.addEventListener('input', () => {
  hashtagsInput.setCustomValidity('')
  hashtagsInput.style.border = 'none'

  const hashtags = hashtagsInput.value.toLowerCase().trim()

  if (!hashtags) {
    return
  }

  const hashtagsAll = hashtags.split(/\s+/)

  for (let i = 0; i < hashtagsAll.length; i++) {
    const notStartFromHash = !hashtagsAll[i].startsWith(HASH)
    if (notStartFromHash) {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с решётки')
    }

    // const onlyNumAndLet = hashtagsAll[i].match(/#\w+$/g)
    // // тут ещё и нижнее подчеркивание, и не совсем так работает
    // if (!onlyNumAndLet) {
    //   hashtagsInput.setCustomValidity('После решётки должны быть только буквы и числа')
    // }

    const onlyHash = hashtagsAll[i] === HASH
    if (onlyHash) {
      hashtagsInput.setCustomValidity('Не может состоять только из решётки')
    }

    const isLong = hashtagsAll[i].length > MAX_HASHTAG_LENGTH
    if (isLong) {
      hashtagsInput.setCustomValidity('Слишком длинный хэш-тег')
    }

    const isNotSplitWithSpace = hashtagsAll[i].indexOf('#', 1) >= 1
    if (isNotSplitWithSpace) {
      hashtagsInput.setCustomValidity('хэш-теги должны разделяться пробелами')
    }

    const duplicates = hashtagsAll.filter((item, index, arr) => {
      return arr.indexOf(item) !== index;
    });
    if (duplicates.length > 0) {
      hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды')
    }

    const isMore5 = hashtagsAll.length > MAX_NUMBER_HASHTAGS
    if (isMore5) {
      hashtagsInput.setCustomValidity('Не больше 5 хэш-тегов')
    }

    if (notStartFromHash || onlyHash || isLong || isNotSplitWithSpace || duplicates.length > 0 || isMore5) {
      hashtagsInput.style.border = '2px solid red'
    }

    hashtagsInput.reportValidity()

  }
})

descriptionInput.addEventListener('input', () => {
  const valueLength = descriptionInput.value.length
  if (valueLength > MAX_DESCRIPTION_LENGTH) {
    descriptionInput.style.border = '2px solid red'
    descriptionInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_DESCRIPTION_LENGTH) +' симв.');
  }
  else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity()
})

const onEscDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault()
    evt.stopPropagation()
  }
}

hashtagsInput.addEventListener('keydown', onEscDown)
descriptionInput.addEventListener('keydown', onEscDown)





// переопределить validity (просто для инфы)
// descriptionInput.addEventListener('invalid', () => {
//   if (descriptionInput.validity.tooLong) {
//     descriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
//   }
//   else {
//     descriptionInput.setCustomValidity('');
//   }
// });

