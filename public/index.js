const menuIconButton = document.querySelector("[data-menu-icon-btn");
const sideNav = document.querySelector("[data-sidenav]");
const sideNavLink = document.querySelector("[data-sidenav-link]");
const switchBox = document.querySelector("[data-switch-box]");
const toggler = document.querySelector("[data-toggle-switch]");

// toggling active class of sidnav links
let listItems = document.querySelectorAll(".sidenav-list");

menuIconButton.addEventListener("click", () => {
  console.log("clicked");
  sideNav.classList.toggle("open");
});

listItems.forEach((list) => {
  list.addEventListener("click", (e) => {
    listItems.forEach((el) => el.classList.remove("active"));
    list.classList.add("active");
  });
});

switchBox.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  sideNav.classList.toggle("dark");
  document.querySelector(".toggle-container").classList.toggle("dark-fade");
});

// handing adding of notes
const addTaskButton = document.querySelectorAll("[data-add-task]");
const taskForm = document.querySelector(".task-form-container");

addTaskButton.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(taskForm);
    taskForm.classList.toggle("active");
  });
});
