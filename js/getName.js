const question = document.querySelector(".question"),
  form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  hello = document.querySelector(".js-hello");

const NAME_LS = "user-name",
  SHOWING_CN = "showing";

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintName(currentValue);
  localStorage.setItem(NAME_LS, currentValue);
}

function askName() {
  question.classList.add(SHOWING_CN);
  input.focus();
  form.addEventListener("submit", handleSubmit);
}

function paintName(userName) {
  const date = new Date();
  const hour = date.getHours();
  const time = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 22 ? 'evening' : 'night';
  const span = document.createElement('span');
  question.classList.add("hidden");
  span.innerText = `Good ${time} ${userName}.`;
  hello.appendChild(span);

}

function loadName() {
  const userName = localStorage.getItem(NAME_LS);
  if (userName) {
    paintName(userName);
  } else {
    askName();
  }
}

 function init() {
  loadName();
}

 init();