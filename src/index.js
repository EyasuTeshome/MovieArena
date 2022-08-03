/* eslint-disable */
import './style.css';

fetch('https://yts.mx/api/v2/list_movies.json?genre=animation&limit=25&sort_by=download_count').then((data) => data.json()).then((objectData) => {
  const Arr = objectData.data.movies;
  let tableData = '';
  Arr.map((value) => {
    tableData += `<ul class="p-5 d-flex flex-wrap gap-5 justify-content-center mainlist">
        <li><img src="${value.background_image}" alt=""></li>
        <li>${value.title}</li>
      </ul>`;
    document.getElementById('tableBody').innerHTML = tableData;
  });
});
