const question = document.querySelector(".js-question"),
  form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  hello = document.querySelector(".js-hello"),
  clock = document.querySelector(".js-clock"),
  toDoForm2 = document.querySelector(".js-toDoForm"),
  toDoList2 = document.querySelector(".js-toDoList");

const NAME_LS = "user-name";

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintName(currentValue);
  localStorage.setItem(NAME_LS, currentValue);
}

function askName() {
  question.classList.remove('hidden');
  input.focus();
  form.addEventListener("submit", handleSubmit);
}

function paintName(userName) {
  const date = new Date();
  const hour = date.getHours();
  const time = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 22 ? 'evening' : 'night';
  const span = document.createElement('span');
  question.classList.add("hidden");
  hello.classList.remove("hidden");
  clock.classList.remove("hidden");
  toDoForm2.classList.remove("hidden");
  toDoList2.classList.remove("hidden");
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