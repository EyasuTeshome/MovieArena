const appId = 'HAFllv9WAhjonrhWoDqx';
const fetchTVAPI = async () => {
  const TVResponse = await fetch('https://yts.mx/api/v2/list_movies.json?genre=animation');
  const getShowResult = await TVResponse.json();
  return getShowResult;
};

const fetchInvolvementAPI = async () => {
  const involvementAPIResponse = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`);
  const getLikeResult = await involvementAPIResponse.json();
  return getLikeResult;
};

const submitLike = async (newLike) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: newLike,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

const fetchInvolvementAPIcomments = async (id) => {
  const commentsResponse = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${id}`);
  const getCommentResult = await commentsResponse.json();
  return getCommentResult;
};

const submitComment = async (newComment, theId, newName) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: theId,
      username: newName,
      comment: newComment,

    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export default {
  fetchTVAPI,
  fetchInvolvementAPI,
  submitLike,
  fetchInvolvementAPIcomments,
  submitComment,
};