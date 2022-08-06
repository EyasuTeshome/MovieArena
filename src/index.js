/* eslint-disable*/

import './style.css';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('body');
  return element;
}

document.body.appendChild(component());