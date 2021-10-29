const todoForm = document.querySelector(".js-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todos");

const TODOS_LS = "todosLs";
let todosLs = [
    {
      id: 1,
      text: "HTML",
      completed: true,
    },
    {
      id: 2,
      text: "CSS",
      completed: true,
    },
    {
      id: 3,
      text: "Javascript",
      completed: false,
    },
];

function loading(){
    const msg = "로딩중...";
    const loading_text = document.createElement("li");
    loading_text.setAttribute('id',msg);
    const textNode = document.createTextNode(msg);
    loading_text.appendChild(textNode);
    todoList.appendChild(loading_text);
    setTimeout(() => todoList.removeChild(loading_text),1000);
  }
  
  function show() {
    loading();
    setTimeout(() => loadList(),1000);
     // toDoForm에서 submit에 handleSubmit 이벤트를 연결
  }
  
  show();