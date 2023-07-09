/* global _:readonly */
import './all-pictures.js';
import { comparePosts, renderPosts, setDefaultPosts, setDiscussedPosts, setRandomElements, setRandomPosts } from './all-pictures.js';
import { getData } from './api.js';
import './effects.js';
import './new-picture.js';
import './user-form.js';
import './user-picture.js';
import { showAlert } from './util.js';

const RERENDER_DELAY = 500

getData((posts) => {
  renderPosts(posts)
  setDefaultPosts(_.debounce(() => renderPosts(posts), RERENDER_DELAY))
  setRandomPosts(_.debounce(() => renderPosts(setRandomElements(posts)), RERENDER_DELAY))
  setDiscussedPosts(_.debounce(() => renderPosts(posts.slice().sort(comparePosts)), RERENDER_DELAY))
}, showAlert)
