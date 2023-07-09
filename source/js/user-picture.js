const FILE_TYPES = ['jpg', 'jpeg', 'png']
const Picture = {
  width: 600,
  height: 600,
}

const fileChooser = document.querySelector('#upload-file')
const previewContainer = document.querySelector('.img-upload__preview')
const preview = previewContainer.querySelector('img')
const effects = document.querySelectorAll('.effects__preview')


fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0]
  const fileName = file.name.toLowerCase()
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it)
  })

  if (matches) {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      preview.src = reader.result
      preview.width = Picture.width
      preview.height = Picture.height
      effects.forEach((effect) => {
        effect.style.backgroundImage =`url(${reader.result})`
      })
    })
    reader.readAsDataURL(file)
  }
})
