const TODOS_LS = "todos";
let todos = [];
let load = [];

const $input = document.querySelector(".input-todo");
const $todos = document.querySelector(".todos");

function render() {
  let html = "";

  todos.forEach((todo) => {
    html += `
    <li id=${todo.id}>
      <label>
        <input type="checkbox"  ${todo.completed ? "checked" : ""}>
        ${todo.content}
      </label>
      <span class="remove">X</span>
    </li>
    `;
  });
  saveTodos();
  $todos.innerHTML = html;
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos)); // localStorage에 리스트 저장
}

// const getTodos = function () {
//   // TODO: 서버로부터 데이터를 취득.
//   todos = [
//     { id: 1, content: "HTML", completed: true },
//     { id: 2, content: "CSS", completed: true },
//     { id: 3, content: "Javascript", completed: false },
//   ];
//   render();
// };

function findMaxId() {
  return Math.max(0, ...todos.map((todo) => todo.id));
}

const addTodos = function (e) {
  if(e.keyCode === 13 && $input.value.trim() !== ""){
    todos = [
      ...todos,
      { id: findMaxId() + 1, content: $input.value, completed: false },
    ];
    render();
    $input.value = "";
    return false;
  }
};

const removeTodos = function (e) {
  if (!e.target.classList.contains("remove")) return;

  const listId = +e.target.parentNode.id;
  todos = todos.filter((todo) => todo.id !== listId);

  // Id 재정렬
  if (todos.length !== findMaxId()) {
    todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }));
  }
  render();
};

const toggleTodos = function (e) {
  const listId = +e.target.parentNode.parentNode.id;
  todos = todos.map((todo) =>
    todo.id === listId ? { ...todo, completed: !todo.completed } : todo
  );

  render();
};

function loading(){
  console.log($todos);
  const msg = "로딩중...";
  const loading_text = document.createElement("li");
  loading_text.setAttribute('id',msg);
  const textNode = document.createTextNode(msg);
  loading_text.appendChild(textNode);
  $todos.appendChild(loading_text);
  setTimeout(() => $todos.removeChild(loading_text),1000);
}

function main(){
  $input.onkeydown = addTodos;
  $todos.onclick = removeTodos;
  $todos.onchange = toggleTodos;
}

loading();
window.onload = function () {
  todos = [
    { id: 1, content: "HTML", completed: true },
    { id: 2, content: "CSS", completed: true },
    { id: 3, content: "Javascript", completed: false },
  ];
  setTimeout(render, 1000);
  setTimeout(main, 1000);
};

