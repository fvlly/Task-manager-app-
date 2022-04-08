const menuIconButton = document.querySelector("[data-menu-icon-btn");
const sideNav = document.querySelector("[data-sidenav]");
const sideNavLink = document.querySelector("[data-sidenav-link]");
const switchBox = document.querySelector("[data-switch-box]");
const toggler = document.querySelector("[data-toggle-switch]");

menuIconButton.addEventListener("click", () => {
  console.log("clicked");
  sideNav.classList.toggle("open");
});

// toggling active class of sidnav links
let listItems = document.querySelectorAll(".sidenav-list");

listItems.forEach((list) => {
  list.addEventListener("click", (e) => {
    listItems.forEach((el) => el.classList.remove("active"));
    list.classList.add("active");
  });
});

switchBox.addEventListener("click", () => {
  // if (sideNav.classList.contains(open) && toggler.checked ) {
  //   switchBox.innerHTML = "Dark mode"
  // } else {
  //   switchBox.innerHTML = "light mode"
  // }

  document.body.classList.toggle("dark");
  sideNav.classList.toggle("dark");
  document.querySelector(".toggle-container").classList.toggle("dark-fade");
});
