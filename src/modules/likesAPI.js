const URL_API = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HtL80VFuEa9UDXYWP9te/likes/';
const likesContainer = document.querySelector('.heartlike');

const likes = () => {
  likesContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.bi-heart');
    // if (!clicked) return;
    const item = clicked.getAttribute('id');
    fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        item_id: item,
      }),
    });
    fetch(URL_API).then((response) => response.json()).then((data) => {
      const likeCount = document.querySelector(`.likes-${item}`);
      likeCount.querySelector('.numb').textContent = `${data.filter((items) => items.item_id === item)[0].likes} likes`;
    });
  });
};

const displayLikes = () => {
  fetch(URL_API).then((response) => response.json()).then((data) => {
    data.forEach((item) => {
      const likeCount = document.querySelector(`.likes-${item.item_id}`);
      likeCount.querySelector('.numb').textContent = `${item.likes} likes`;
    });
  }).catch((error) => error);
};
export { likes, displayLikes };