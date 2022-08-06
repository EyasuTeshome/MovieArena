/* eslint-disable*/

const appId = 'KFWAWpNuJb0b9FZEXp7P';
const fetchTVAPI = async () => {
  const TVResponse = await fetch('https://api.tvmaze.com/shows');
  const getShowResult = await TVResponse.json();
  return getShowResult.slice(6, 18);
};