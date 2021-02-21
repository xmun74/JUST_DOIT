const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finList = document.querySelector(".js-toDoListFn");

const TODOS_LS = "PENDING";
const FIN_LS = "FINISHED";

let toDos = []; //toDos가 많으니까 배열로 초기에 만들어줌
let fins = [];

function handleBack(event) {
  const li = event.target.parentNode; //btn의 부모인 li 대입
  const task = fins.find((task) => {
    return task.id === li.id;
  });
  handleDelete(event);
  paintToDo(task); // todo로 다시 돌아가야해서
  saveToDos();
}

function handleFinish(event) {
  const li = event.target.parentNode; //btn의부모 li 대입
  const task = toDos.find((task) => {
    return task.id === li.id;
  });
  handleDelete(event);
  paintFin(task); //fin으로 들어가기
  saveToDos();
}

function handleDelete(event) {
  const btn = event.target; //이벤트 클릭할때 선택되는 btn대입
  const li = btn.parentNode; //btn의 부모인 li 대입
  li.parentNode.removeChild(li); //자식엘리먼트 삭제

  toDos = toDos.filter((task) => {
    return task.id !== li.id;
  });
  fins = fins.filter((task) => {
    return task.id !== li.id;
  });
  saveToDos();
}

function paintFin(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");

  span.innerText = task.text;
  delBtn.innerText = "✖";
  backBtn.innerText = "⬅";

  delBtn.addEventListener("click", handleDelete);
  backBtn.addEventListener("click", handleBack);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = task.id; //li에도 id추가함.delbtn했을때 어떤 li인지 찾아야해서
  finList.appendChild(li);

  fins.push(task); //fins array안에 task를 넣음
  saveToDos();
}

function paintToDo(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");

  span.innerText = task.text;
  delBtn.innerText = "✖";
  finBtn.innerText = "✔";

  delBtn.addEventListener("click", handleDelete);
  finBtn.addEventListener("click", handleFinish);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = task.id;
  toDoList.appendChild(li);

  toDos.push(task); //toDos array안에 task를 넣음
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(FIN_LS, JSON.stringify(fins));
}

function taskObj(text) {
  return {
    id: String(Date.now()),
    text
  };
}

function handleSubmit(event) {
  event.preventDefault();
  const task = taskObj(toDoInput.value);
  paintToDo(task);
  toDoInput.value = ""; //제출하면 인풋 칸에 썼던 글자 없어지는 것
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedFins = localStorage.getItem(FIN_LS);
  if (loadedToDos || loadedFins) {
    //저장해논 toDos가 있을때 불러오기
    const parsedToDos = JSON.parse(loadedToDos); //로컬에서 JS obj로 변환해서 가져옴
    const parsedFins = JSON.parse(loadedFins);
    parsedToDos.forEach((task) => {
      paintToDo(task);
    });
    parsedFins.forEach((task) => {
      paintFin(task);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();