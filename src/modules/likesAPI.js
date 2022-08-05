/* eslint-disable */
const fetchlikes = async () => {
  alert('uio')
  const data = fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HtL80VFuEa9UDXYWP9te/likes/')
  const response = await data;
  const res = response.json();
  console.log(res);
  // console.log(likesAPI);

  const list = document.querySelector('.mainlist');
list.addEventListener('click', () => {
alert('done');
if (e.target.className === 'bi bi-heart') {
  addLikes(e.target.id);
}
})
}



fetchlikes();

export default fetchlikes;