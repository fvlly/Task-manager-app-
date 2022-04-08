const menuIconButton = document.querySelector("[data-menu-icon-btn");
const sideNav = document.querySelector("[data-sidenav]");
const switchBox = document.querySelector("[data-switch-box]");
const toggler = document.querySelector("[data-toggle-switch]")

menuIconButton.addEventListener("click", () => {
  console.log("clicked");
  sideNav.classList.toggle("open");


});

switchBox.addEventListener("click", ()=>{
  if (sideNav.classList.contains(open) && toggler.checked ) {
    switchBox.innerHTML = "Dark mode"
  } else {
    switchBox.innerHTML = "light mode"
  }
})



