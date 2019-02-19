const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const toDos = [];

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const id = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = id;
  toDoList.appendChild(li);
  toDos.push({
    id,
    text,
  });
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null) {
    JSON.parse(loadedToDos).map(toDo => {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();