const getSeries = async () => {
  const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre=animation&limit=25&sort_by=download_count');
  const series = await response.json();
  return series;
};

const newLike = async (id) => {
  const data = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HtL80VFuEa9UDXYWP9te/likes/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });
  return data;
};

const getData = async (call) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HtL80VFuEa9UDXYWP9te/likes/';
  const data = await fetch(url);
  const content = await data.json();
  call(content);
};

const addLikes = (id) => {
  getSeries().then((data) => {
    data.forEach((series) => {
      if (series.id.toString() === id.toString()) {
        newLike(id).then((data) => {
          if (data.status === 201) {
            getData((data) => {
              data.forEach((e) => {
                if (e.item_id.toString() === id.toString()) {
                  const el = document.getElementById(id.toString());
                  el.parentElement.lastElementChild.firstElementChild.textContent = e.likes;
                }
              });
            });
          }
        });
      }
    });
  });
};

window.addEventListener('load', () => {
  getData((data) => {
    data.forEach((element) => {
      const likesCount = document.querySelectorAll('.likes');
      likesCount.forEach((e) => {
        if (e.id.toString() === element.item_id.toString()) {
          e.textContent = element.likes;
        }
      });
    });
  });
});

const list = document.querySelector('body');
list.addEventListener('click', (e) => {
  if (e.target.className === 'bi bi-heart') {
    addLikes(e.target.id);
  }
});

export default addLikes;

// const fetchlikes = async () => {
//   alert('uio');
//   const data = fetch(');
//   const response = await data;
//   const res = response.json();
//   // console.log(res);
//   // console.log(likesAPI);

//

// fetchlikes();

// export default fetchlikes;