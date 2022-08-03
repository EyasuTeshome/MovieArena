/* eslint-disable */

fetch('https://yts.mx/api/v2/list_movies.json?genre=animation&limit=25&sort_by=download_count').then((data) => data.json()).then((objectData) => {
  const Arr = objectData.data.movies;
  let tableData = '';
  Arr.map((value) => {
    tableData += `<div class="mainlist">
          <span><img src="${value.medium_cover_image}" alt=""></span>
          <span class='heart-value'>${value.title} <i class="bi bi-heart">10</i></span>
          <button class= "open-comments" >comments</button>
        </div>
        `;
    document.getElementById('tableBody').innerHTML = tableData;
  });
});

export default Arr;