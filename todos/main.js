/* eslint-disable */

// 외부 js 파일 사용 시 window.onload 안 됨
// https://github.com/codesandbox/codesandbox-client/issues/4683

const $form = document.querySelector(".js-form");
const $input = document.querySelector(".input-todo");
const $todos = document.querySelector(".todos");

let todos = [
  { id: 1, content: "HTML", completed: true },
  { id: 2, content: "CSS", completed: true },
  { id: 3, content: "Javascript", completed: false },
];

const findMaxId = () => Math.max(0, ...todos.map((todo) => todo.id));

const addTodos = () => {
  todos.push({
    id: findMaxId() + 1,
    content: $input.value,
    completed: false,
  });
  render();
  $form.reset();
};

const removeTodos = (e) => {
  if (!e.target.classList.contains("remove")) return;

  const listId = +e.target.parentNode.id;
  todos.splice(
    todos.findIndex((todo) => todo.id === listId),
    1
  );

  // Id 재정렬
  if (todos.length !== findMaxId()) {
    todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }));
  }
  render();
};

const toggleTodos = (e) => {
  const listId = +e.target.parentNode.parentNode.id;
  const idx = todos.findIndex((todo) => todo.id === listId);
  todos[idx].completed = !todos[idx].completed;

  render();
};

const render = () => {
  if ($todos)
    $todos.innerHTML = todos
      .map(
        (todo) =>
          `<li id=${todo.id}>
      <label>
        <input type="checkbox"  ${todo.completed ? "checked" : ""}>
        ${todo.content}
      </label>
      <span class="remove">X</span>
    </li>`
      )
      .join("");

  localStorage.setItem("todos", JSON.stringify(todos)); // localStorage에 리스트 저장
};
setTimeout(render, 1000);

if ($form && $input && $todos) {
  $form.onsubmit = addTodos;
  $todos.onclick = removeTodos;
  $todos.onchange = toggleTodos;
}
