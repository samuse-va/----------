import { getRandomElement, getRandomInteger } from './util.js'

const DESCRIPTIONS = [
  'Mooood',
  'Большому кораблю – большое плавание',
  'Заурчательно',
  'Этот день 5 лет назад',
  'А уже весна',
  'Go go powerrangers',
  'Hepepe',
  'Новый день – новая фотка',
  'Всем привет!',
  'Я никогда не делал этого раньше',
  'А чем занят ты?',
  'Art',
]

const NAMES = ['Катя', 'Маша', 'Олег', 'Петя', 'Игорь', 'Диана']

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const POSTS_NUMBER = 25

const Likes = {
  MIN: 15,
  MAX: 200,
}

const Comments = {
  MIN: 0,
  MAX: 5,
}

const CommentsIds = {
  MIN: 0,
  MAX: 999,
}

const Avatars = {
  FIRST: 1,
  LAST: 6,
}

const posts = []

const createComment = () => {
  const comments = []

  for (let i = 0; i < getRandomInteger(Comments.MIN, Comments.MAX); i++) {
    comments.push({
      id: getRandomInteger(CommentsIds.MIN, CommentsIds.MAX),
      avatar: '../img/avatar-' + getRandomInteger(Avatars.FIRST, Avatars.LAST) +'.svg',
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES),
    })
  }
  return comments
}

const createPost = () => {
  for (let i = 0; i < POSTS_NUMBER; i++) {
    posts.push( {
      id: i,
      url: '../photos/' + (i + 1) + '.jpg',
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length)],
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: createComment(),
    })
  }
  return posts
}

export { createPost }
