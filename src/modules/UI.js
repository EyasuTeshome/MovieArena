/* eslint-disable*/
import fetchData from './APIhandler';

const displayListOfShows = document.querySelector('.display-list-of-shows');
const showCounter = document.querySelector('.show-counter');

const popUp = document.querySelector('.pop-up');
const commentPopUp = document.querySelector('.comment');
const showsContainer = document.querySelector('.shows-container');

export const displayShows = async () => {
  const showData = await fetchData.fetchTVAPI();
  const involveData = await fetchData.fetchInvolvementAPI();

  const values = showData
    .map(
      (result) => `<div class="display-show">
      <img src="${result.image.original}" alt="">
      <p class="show-title">${result.name}
      <span>
      <a id=${result.id} class="like-heart" href="#">&#9825;</a>
      ${
  involveData.filter(
    (like) => parseInt(like.item_id, 10) === parseInt(result.id, 10),
  )[0].likes
} likes
      </span>
      </p>
      <button id=${
  result.id
} class="btn btn-secondary comment-btn">Comments</button>
      </div>`,
    )
    .join('');

  displayListOfShows.innerHTML = values;
};