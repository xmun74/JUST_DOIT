const greetingForm = document.querySelector(".js-greetings_form"),
  greetingInput = greetingForm.querySelector("input"),
  greetingInPut = greetingForm.querySelector(".greeting_input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";
// 이름 - USER_LS안에 value(입력한거)값
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
// 제출 - 이벤트기본값초기화, (인사말)이름제출값 가져와서 띄우고, (저장)이름제출값 계속저장해놓기
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
// 이름입력- 이벤트 제출할때 함수실행
function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingInPut.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
  
}
// 인사- 폼삭제. 인사말추가
function paintGreeting(text) {
  greetingForm.classList.remove(SHOWING_CN);
  greetingInPut.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text} !`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
