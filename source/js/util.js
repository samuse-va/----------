const ALERT_SHOW_TIME = 5000

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0 || min === max) return -1
  if (max < min) {
    [min, max] = [max, min]
  }
  const randomInteger = Math.random() * (max - min + 1)

  return Math.floor(randomInteger) + min
}

const checkCommentLength = (comment, maxLength) => {
  return comment.length <= maxLength
}

const getRandomElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)]
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc'
}

const main = document.querySelector('main')
const successTemplate = document.querySelector('#success').content
const successFragment = document.createDocumentFragment()

const showSuccess = () => {
  const successAlert = successTemplate.cloneNode(true)

  const successButton = successAlert.querySelector('.success__button')
  document.addEventListener('click', (evt) => {
    let element = document.querySelector('.success__inner')
    if (!element.contains(evt.target)) {
      document.querySelector('.success').remove()
    }
  })

  successButton.addEventListener('click', () => {
    document.querySelector('.success').remove()
  })

  successFragment.appendChild(successAlert)
  main.appendChild(successFragment)
}

const errorTemplate = document.querySelector('#error').content
const errorFragment = document.createDocumentFragment()


const showError = () => {
  const errorAlert = errorTemplate.cloneNode(true)

  const errorButton = errorAlert.querySelector('.error__button')
  document.addEventListener('click', (evt) => {
    let element = document.querySelector('.error__inner')
    if (!element.contains(evt.target)) {
      document.querySelector('.error').remove()
    }
  })

  errorButton.addEventListener('click', () => {
    document.querySelector('.error').remove()
  })

  errorFragment.appendChild(errorAlert)
  main.appendChild(errorFragment)
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div')
  alertContainer.style.zIndex = 100
  alertContainer.style.position = 'absolute'
  alertContainer.style.left = 0
  alertContainer.style.top = 0
  alertContainer.style.right = 0
  alertContainer.style.padding = '10px 3px'
  alertContainer.style.fontSize = '30px'
  alertContainer.style.textAlign = 'center'
  alertContainer.style.backgroundColor = 'red'

  alertContainer.textContent = message

  document.body.append(alertContainer)

  setTimeout(() => {
    alertContainer.remove()
  }, ALERT_SHOW_TIME)
}

// Заготовка для debounce

// const debounce = (cb, timeout) => {
//   return () => {
//     // Задержка реализуется с помощью setTimeout
//     // Если вызов произошёл до окончания задержки, таймер начинает отсчёт заново
//   };
// };

export { checkCommentLength, getRandomElement, getRandomInteger, isEscEvent, showAlert, showError, showSuccess }


// const DEBOUNCE_DELAY = 500
// const debounce = (cb) => {
//   let lastTimeout = null

//   return (...args) => {
//     if (lastTimeout) {
//       window.clearTimeout(lastTimeout)
//     }
//     lastTimeout = window.setTimeout(() => {
//       cb(...args)
//     }, DEBOUNCE_DELAY)
//   }
// }
