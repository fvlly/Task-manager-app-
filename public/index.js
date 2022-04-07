const menuIconButton = document.querySelector("[data-menu-icon-btn");
const sideNav = document.querySelector("[data-sidenav]");

menuIconButton.addEventListener("click", () => {
  console.log("clicked");
  sideNav.classList.toggle("open");
});
