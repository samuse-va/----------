import { isEscEvent } from './util.js'

const COMMENTS_LOAD_STEP = 5

const body = document.querySelector('body')
const bigPicture = document.querySelector('.big-picture')
const closeElement = bigPicture.querySelector('.cancel')
const commentTemplate = bigPicture.querySelector('.social__comment')
const commentsExamples = bigPicture.querySelectorAll('.social__comment')
const commentsList = document.querySelector('.social__comments')

let commentsShown = []

const commentsCount = bigPicture.querySelector('.social__comment-count')
const commentsMoreButton = bigPicture.querySelector('.comments-loader')

let commentsShownCount = COMMENTS_LOAD_STEP

commentsExamples.forEach((example) => {
  commentsList.removeChild(example)
})

const onBigPictureCloseClick = () => {
  bigPicture.classList.add('hidden')
  body.classList.remove('modal-open')
  document.removeEventListener('keydown', onBigPictureKeydown)
  commentsList.innerHTML = ''
  commentsShownCount = COMMENTS_LOAD_STEP
  commentsShown = []
}

const onBigPictureKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault()
    onBigPictureCloseClick()
  }
}

closeElement.addEventListener('click', () => {
  onBigPictureCloseClick()
})

const setComment = (comment) => {
  const commentSimilar = commentTemplate.cloneNode(true)

  commentSimilar.querySelector('.social__picture').src = comment.avatar
  commentSimilar.querySelector('.social__picture').alt = comment.name
  commentSimilar.querySelector('.social__text').textContent = comment.message

  return commentSimilar
}

const showComments = (comments) => {

  const onCommentsMoreButtonClick = () => {
    showComments(comments)
  }

  commentsShownCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsShownCount
  commentsShown = comments.slice(0, commentsShownCount)

  commentsList.innerHTML = ''

  commentsCount.textContent = `${commentsShown.length} из ${comments.length} комментариев`
  commentsCount.classList.remove('hidden')

  let commentsFragment = document.createDocumentFragment()

  commentsShown.forEach((comment) => {
    commentsFragment.appendChild(setComment(comment))
  })

  commentsList.appendChild(commentsFragment)

  if (comments.length > COMMENTS_LOAD_STEP && commentsShown.length < comments.length) {
    commentsMoreButton.classList.remove('hidden')
    commentsMoreButton.addEventListener('click', onCommentsMoreButtonClick, {once: true})
  } else {
    commentsMoreButton.classList.add('hidden')
  }
  commentsShownCount += COMMENTS_LOAD_STEP
}

const showBigPicture = (picture) => {
  body.classList.add('modal-open')

  commentsShownCount = COMMENTS_LOAD_STEP
  commentsShown = []

  bigPicture.querySelector('.big-picture__img > img').src = picture.url
  bigPicture.querySelector('.social__caption').textContent = picture.description
  bigPicture.querySelector('.likes-count').textContent = picture.likes
  // bigPicture.querySelector('.comments-count').textContent = picture.comments.length

  bigPicture.querySelector('.social__comment-count').classList.add('hidden')
  bigPicture.querySelector('.comments-loader').classList.add('hidden')

  showComments(picture.comments.slice())
  document.addEventListener('keydown', onBigPictureKeydown)

  bigPicture.classList.remove('hidden')
}

export { showBigPicture }

