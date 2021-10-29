// 코드 구현

const $checkbox = document.querySelector(".dark-mode");
// const $checkbox = document.querySelector(".light-mode");

const isUserColorTheme = localStorage.getItem("color-theme");
const isOsColorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

const getUserTheme = () =>
  isUserColorTheme ? isUserColorTheme : isOsColorTheme;

console.log(getUserTheme());

const darkMode = () => {
  document.body.classList.add("dark");
  document.body.classList.remove("light");
  localStorage.setItem("color-theme", "dark");
};

const lightMode = () => {
  document.body.classList.add("light");
  document.body.classList.remove("dark");
  localStorage.setItem("color-theme", "light");
};

if (getUserTheme() === "dark") {
  darkMode();
  $checkbox.setAttribute("checked", true);
} else if (getUserTheme() === "light") {
  lightMode();
}

window.onload = function () {
  if (getUserTheme() === "dark") {
    localStorage.setItem("color-theme", "dark");
    darkMode();
    $checkbox.setAttribute("checked", true);
  } else {
    localStorage.setItem("color-theme", "light");
    lightMode();
  }
};

$checkbox.addEventListener("click", (e) => {
  if (e.target.checked) {
    localStorage.setItem("color-theme", "dark");
    darkMode();
  } else {
    localStorage.setItem("color-theme", "light");
    lightMode();
  }
});
