/* eslint-disable */

fetch('https://yts.mx/api/v2/list_movies.json?genre=animation&limit=25&sort_by=download_count').then((data) => data.json()).then((objectData) => {
  // const Arr = objectData.data.movies;
  let Arr = objectData.data.movies;
  let tableData = '';
  Arr.forEach((value) => {
    tableData += `<div class="mainlist">
          <span><img src="${value.medium_cover_image}" alt=""></span>
          <span class='heart-value'>${value.title}</span>
          <span class='heartlike'><button class= "likes" id='likeBtn'><i class="bi bi-heart"></i></button>
          <sup class='numb'>${value.item_id}</sup></span>
          <button class= "open-comments" >comments</button>
        </div>
        `;
    document.getElementById('tableBody').innerHTML = tableData;
  });
});


export default Arr;