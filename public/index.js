const menuIconButton = document.querySelector("[data-menu-icon-btn");
const sideNav = document.querySelector("[data-sidenav]");
const sideNavLink = document.querySelector("[data-sidenav-link]");
const switchBox = document.querySelector("[data-switch-box]");
const toggler = document.querySelector("[data-toggle-switch]");

// open and close dialog(modal)
// const modal = document.querySelector("#modal")
const openModalButtons = document.querySelectorAll("[data-modal-target");
const closeModalButtons = document.querySelectorAll("[data-modal-close]");
const overlay = document.getElementById("overlay");

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
  // if (sideNav.classList.contains(open) && toggler.checked ) {
  //   switchBox.innerHTML = "Dark mode"
  // } else {
  //   switchBox.innerHTML = "light mode"
  // }

  document.body.classList.toggle("dark");
  sideNav.classList.toggle("dark");
  document.querySelector(".toggle-container").classList.toggle("dark-fade");
});

// opening and closing modal
openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const modal = document.querySelector(button.dataset.modalTarget);
    isModalOpen(modal);
  });
});
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});



const isModalOpen = (modal) => {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
};
const closeModal = (modal) => {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
};
