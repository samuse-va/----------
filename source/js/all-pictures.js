import { showBigPicture } from './big-picture.js'
import { getRandomElement } from './util.js'
// import { createPost } from './data.js'

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture')
const picturesList = document.querySelector('.pictures')
const filtersSection = document.querySelector('.img-filters')
const filterDefault = filtersSection.querySelector('#filter-default')
const filterRandom = filtersSection.querySelector('#filter-random')
const filterDiscussed = filtersSection.querySelector('#filter-discussed')

const setDefaultPosts = (cb) => {
  filterDefault.addEventListener('click', () => {
    filterDefault.classList.add('img-filters__button--active')
    filterRandom.classList.remove('img-filters__button--active')
    filterDiscussed.classList.remove('img-filters__button--active')
    cb()
  })
}

const setRandomElements = (posts) => {
  let elements = []
  for (let i = 0; elements.length < 10; i++) {
    let element = getRandomElement(posts)
    if (!elements.includes(element)) {
      elements.push(element)
    }
  }
  return elements
}

const setRandomPosts = (cb) => {
  filterRandom.addEventListener('click', () => {
    filterRandom.classList.add('img-filters__button--active')
    filterDefault.classList.remove('img-filters__button--active')
    filterDiscussed.classList.remove('img-filters__button--active')
    cb()
  })
}

const comparePosts = (postA, postB) => {
  const rankA = postA.comments.length
  const rankB = postB.comments.length

  return rankB - rankA;
}

const setDiscussedPosts = (cb) => {
  filterDiscussed.addEventListener('click', () => {
    filterDiscussed.classList.add('img-filters__button--active')
    filterDefault.classList.remove('img-filters__button--active')
    filterRandom.classList.remove('img-filters__button--active')
    cb()
  })
}

// const posts = createPost() // temporary data
const renderPosts = (posts) => {
  const picturesFragment = document.createDocumentFragment()

  posts.forEach((picture) => {
    const post = pictureTemplate.cloneNode(true)
    post.querySelector('.picture__img').src = picture.url
    post.querySelector('.picture__comments').textContent = picture.comments.length
    post.querySelector('.picture__likes').textContent = picture.likes

    post.addEventListener('click', (evt) => {
      evt.preventDefault()
      showBigPicture(picture)})

    picturesFragment.appendChild(post)
  })

  const elements = picturesList.querySelectorAll('.picture')
  if (elements) {
    elements.forEach((el) => {el.remove()} )
  }

  picturesList.appendChild(picturesFragment)
  filtersSection.classList.remove('img-filters--inactive')
}

export { comparePosts, renderPosts, setDefaultPosts, setDiscussedPosts, setRandomElements, setRandomPosts }

