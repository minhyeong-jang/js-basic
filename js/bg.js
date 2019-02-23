const body = document.querySelector("body");

const MAX_IMG_NUMBER = 5;

function setImage() {
  const randomNumber = Math.floor(Math.random() * MAX_IMG_NUMBER) + 1;
  const image = new Image();
  image.src = `images/${randomNumber}.jpg`;
  image.classList.add('bgImage');
  body.prepend(image);
}

function init() {
  setImage();
}

init();