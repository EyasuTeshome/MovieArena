/* eslint-disable*/
import fetchData from './APIhandler';

const displayListOfShows = document.querySelector('.display-list-of-shows');
const showCounter = document.querySelector('.show-counter');

const popUp = document.querySelector('.pop-up');
const commentPopUp = document.querySelector('.comment');
const showsContainer = document.querySelector('.shows-container');

const Likes = () => {
    const likeButtons = document.getElementsByClassName('like-heart');
    Array.from(likeButtons).forEach((likeButton) => {
      likeButton.addEventListener('click', async (e) => {
        await fetchData.submitLike(e.target.id);
        // eslint-disable-next-line no-use-before-define
        displayShows();
      });
    });
  };

const openPopUpWindow = () => {
  const commentButtons = document.getElementsByClassName('comment-btn');
  Array.from(commentButtons).forEach((commentButton) => {
    commentButton.addEventListener('click', async (e) => {
      const showData = await fetchData.fetchTVAPI();
      const targetId = e.target.id;
      const commentData = await fetchData.fetchInvolvementAPIcomments(targetId);
      showsContainer.classList.add('hide');
      popUp.classList.remove('hide');
      commentPopUp.classList.remove('hide');
      const selectedShow = showData.filter(
        (data) => data.id === Number(targetId),
      )[0];

      popUp.innerHTML = `<div class="display-popup-show">
<p class='button_p'><button type="button" data-close-button class="close-button">&times;</button></p>
         <div class="pop-up-img">  
         <img src="${selectedShow.image.original}" alt="">
           <h3>${selectedShow.name}</h3>
           <p>${selectedShow.summary}</p>
         </div>
         <div class="detail_container">
          <div>
            <p><strong>Language: </strong> ${selectedShow.language}</p>
            <p><strong>Premiered: </strong> ${selectedShow.premiered}</p>
          </div>
        <div>
          <p><strong>Runtime: </strong>${selectedShow.runtime}</p>
          <p><strong >Rating: </strong>${selectedShow.rating.average}</p>
        </div>
        </div>
        <hr>
        <div class="comment_container">
          <h3 class="commnent-counter" >Comments(${commentCounter(
    commentData,
  )})</h3> 
          <div class="comments-container">        
          ${commentData
    .map(
      (data) => `
        <span>${data.creation_date} </span>
        <span>${data.username}: </span>
        <span>${data.comment}</span><br>
      `,
    )
    .join('')}
    </div>
    <hr>
        </div>
          <form action="#">
          <input id="${targetId}" class="name_input" type="text" placeholder="Your name" name="username" required>
          <input id="${targetId}" class="insight_input" type="text" placeholder="Your insights" name="insights" required>
          <p class="button_p"><button class="submit_button btn btn-secondary comment-btn"  id="${targetId}" type="submit">Comment</button></p>
        </form>
        </div>`;
      comments();
    });
  });
};

const closePopUp = () => {
  const selector2 = '.close-button';

  document.addEventListener('click', async (e) => {
    const el = e.target;
    if (!el.matches(selector2)) {
      return;
    }
    showsContainer.classList.remove('hide');
    popUp.classList.add('hide');
    commentPopUp.classList.add('hide');
  });
};

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