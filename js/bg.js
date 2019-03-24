const clientId = "8bca8a1caaa60bf9756e8bfa221a3964bf23712b7e577b122d02e1519d21c56b";
const clientSecret = "e90293306216a1b47f4a41b0f70422e8eaa7fbdb5d3f2045ef4b5df5b1a9d02d";
const date = new Date();
const BACKGROUND_LS = `${date.getFullYear()}${date.getMonth()}${date.getDay()}-background`;
const background = document.querySelector(".js-background"),
  image = background.querySelector(".js-image");

const MAX_IMG_NUMBER = 5;

function setImage(url) {
  image.style.backgroundImage = `url(${url})`;
}

function getImage() {
  fetch(`https://api.unsplash.com/photos/random?client_id=${clientId}&client_secret=${clientSecret}&count=1&query=landscape`)
    .then(res => res.json())
    .then(json => {
      setImage(json[0].urls.regular);
      localStorage.setItem(BACKGROUND_LS, JSON.stringify(json[0]));
    }); 
}

function loadedImage() {
  const bgData = localStorage.getItem(BACKGROUND_LS);
  if(!bgData) {
    getImage();
  } else {
    setImage(JSON.parse(bgData).urls.regular);
  }
}

function init() {
  loadedImage();
}

init();