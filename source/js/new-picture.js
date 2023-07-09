import { sendData } from './api.js';
import { setDefaultLevel } from './effects.js';
import { isEscEvent, showError, showSuccess } from './util.js';


const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
}

const body = document.querySelector('body')
const newPictureSection = document.querySelector('.img-upload')
const uploadControl = newPictureSection.querySelector('.img-upload__control')
const pictureForm = newPictureSection.querySelector('.img-upload__form')
const editImg = newPictureSection.querySelector('.img-upload__overlay')
const uploadFileInput = newPictureSection.querySelector('.img-upload__input')
const closeElement = newPictureSection.querySelector('.cancel')
const preview = newPictureSection.querySelector('.img-upload__preview > img')
const hashtagsInput = pictureForm.querySelector('.text__hashtags')
const descriptionInput = pictureForm.querySelector('.text__description')

const scaleSmaller = newPictureSection.querySelector('.scale__control--smaller')
const scaleValue = newPictureSection.querySelector('.scale__control--value')
const scaleBigger = newPictureSection.querySelector('.scale__control--bigger')

const onCancelKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault()
    closeForm() //onCloseElementClick()
  }
}

const resetSettings = () => {
  preview.style = 'transform: scale(1.00)'
  // preview.style.filter = ''
  // if (lastClass) {
  //   preview.classList.remove(lastClass)
  // }
  scaleValue.value = '100%'
  // effectLevel.classList.add('visually-hidden')
  hashtagsInput.value = ''
  descriptionInput.value = ''
}

const openForm = () => {
  body.classList.add('modal-open')
  editImg.classList.remove('hidden')
  scaleValue.value = '100%'
  document.addEventListener('keydown', onCancelKeydown)
}

const closeForm = () => {
  editImg.classList.add('hidden')
  body.classList.remove('modal-open')
  document.removeEventListener('keydown', onCancelKeydown)
  uploadFileInput.value = ''
  resetSettings()
  setDefaultLevel();
}

closeElement.addEventListener('click', () => closeForm())

uploadControl.addEventListener('click', () => openForm())

scaleSmaller.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) - Scale.STEP

  if ( scale <= Scale.MIN) {
    scale = Scale.MIN
  }

  scaleValue.value = scale + '%'
  scale = scale / 100
  preview.style.transform = `scale(${scale})`
})

scaleBigger.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) + Scale.STEP

  if ( scale >= Scale.MAX) {
    scale = Scale.MAX
  }

  scaleValue.value = scale + '%'
  scale = scale / 100
  preview.style.transform = `scale(${scale})`
})

const setPictureFormSubmit = (closeForm) => {
  pictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    sendData(closeForm, showSuccess, showError, new FormData(evt.target))
  })
}

setPictureFormSubmit(closeForm)
