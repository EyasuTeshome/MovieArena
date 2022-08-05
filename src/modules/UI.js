import fetchData from './APIhandler.js';
// import tvm from './anime.png';

// const logo = document.querySelector('.logo');
const displayListOfShows = document.querySelector('.display-list-of-shows');
const showCounter = document.querySelector('.show-counter');
const mainPageText = document.querySelector('.main-page-text');

const popUp = document.querySelector('.pop-up');
const commentPopUp = document.querySelector('.comment');
const showsContainer = document.querySelector('.shows-container');

// const headerLogo = () => {
//   const myIcon = new Image();
//   myIcon.src = tvm;
//   return logo.append(myIcon);
// };
/* eslint-disable no-use-before-define */
const Likes = () => {
  const likeButtons = document.getElementsByClassName('like-heart');
  const showLikes = document.getElementsByClassName('show-likes');
  Array.from(likeButtons).forEach((likeButton) => {
    likeButton.addEventListener('click', async (e) => {
      await fetchData.submitLike(e.target.id);
      const likeNumber = showLikes[parseInt(e.target.id, 10) - 1].innerHTML;
      let intLikeNumber = parseInt(likeNumber, 10);
      intLikeNumber += 1;
      showLikes[parseInt(e.target.id, 10) - 1].innerHTML = intLikeNumber;
    });
  });
};

const commentCounter = (commentData) => commentData.length;

const comments = () => {
  const inputName = document.querySelector('.name_input');
  const inputInsights = document.querySelector('.insight_input');
  const selector3 = '.submit_button';
  const commentCounterContainer = document.querySelector('.commnent-counter');
  const commentContainer = document.querySelector('.comments-container');
  document.addEventListener('click', async (e) => {
    const el = e.target;
    e.preventDefault();
    if (!el.matches(selector3)) {
      return;
    }

    if (inputInsights.value !== '' && inputName.value !== '') {
      await fetchData.submitComment(
        inputInsights.value,
        el.id,
        inputName.value,
      );

      let commentNumber = parseInt(
        commentCounterContainer.innerHTML.slice(9),
        10,
      );
      commentNumber += 1;
      commentCounterContainer.innerHTML = `Comments(${commentNumber})`;
      const comment = document.createElement('div');
      comment.innerHTML = `
        <span>${new Date().toISOString().split('T')[0]}</span>
        <span>${inputName.value}</span>
        <span>${inputInsights.value}</span>
      `;
      commentContainer.append(comment);
      inputName.value = '';
      inputInsights.value = '';
    }
  });
};

const openPopUpWindow = () => {
  const commentButtons = document.getElementsByClassName('comment-btn');
  Array.from(commentButtons).forEach((commentButton) => {
    commentButton.addEventListener('click', async (e) => {
      const convertedData = await fetchData.fetchTVAPI();
      const showData = convertedData.data.movies;
      const targetId = e.target.id;
      const commentData = await fetchData.fetchInvolvementAPIcomments(targetId);
      showsContainer.classList.add('hide');
      popUp.classList.remove('hide');
      commentPopUp.classList.remove('hide');
      mainPageText.classList.add('hide');
      const selectedShow = showData.filter(
        (data) => data.id === Number(targetId),
      )[0];
      console.log(targetId);
      popUp.innerHTML = `<div class="display-popup-show">
        <button type="button" data-close-button class="close-button">&times;</button>
         <div class="pop-up-img">  
         <img src="${selectedShow.large_cover_image}" alt="">
           <h3>${selectedShow.title}</h3>
           <p>${selectedShow.summary}</p>
         </div>
         <div class="detail_container">
          <div>
            <p><strong>Language: </strong> ${selectedShow.language}</p>
            <p><strong>Premiered: </strong> ${selectedShow.date_uploaded}</p>
          </div>
        <div>
          <p><strong>Runtime: </strong>${selectedShow.runtime}</p>
          <p><strong >Rating: </strong>${selectedShow.rating}</p>
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
          <p class="button_p"><button class="submit_button btn btn-secondary comment-submit-btn"  id="${targetId}" type="submit">Comment</button></p>
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
    mainPageText.classList.remove('hide');
  });
};

const showCount = async () => {
  const numberOfShows = await fetchData.fetchTVAPI();
  showCounter.innerHTML = `Best TV series of all times (${numberOfShows.length})`;
};
export const displayShows = async () => {
  const convertedData = await fetchData.fetchTVAPI();
  const showData = convertedData.data.movies;
  const involveData = await fetchData.fetchInvolvementAPI();
  console.log(showData);
  const values = showData.map((result) => `<div class="display-show">
  <img src="${result.large_cover_image}" alt="">
  <div class="title-like">
    <p class="show-title">${result.title}</p>
    <div class="heart-like">
      <a class="like-heart" href="#">&#9825;</a>
      <p class="show-likes">
      ${
  involveData.filter(
    (like) => parseInt(like.item_id, 10) === parseInt(result.id, 10),
  )[0]
}
      </p> likes
      </div>
    </div>
    <button id =${result.id} class="btn btn-secondary comment-btn">Comments</button>
    </div>`).join('');

  displayListOfShows.innerHTML = values;

  Likes();
  openPopUpWindow();
  closePopUp();
  showCount();
};

export default { };