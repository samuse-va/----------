const getData = (onSuccess, showAlert) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then(response => response.json())
    .then(posts => onSuccess(posts))
    .catch(() => showAlert('При загрузке данных произошла ошибка'))
}

const sendData = (closeForm, onSuccess, onFail, body) => {

  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok){
        closeForm()
        onSuccess()
      } else {
        closeForm()
        onFail()
      }
    })
    .catch(() => onFail())

}

export { getData, sendData }
