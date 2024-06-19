const leftMenu = () => {
  const body = document.querySelector("body");
  const aside = document.getElementById("leftMenu");
  const hamburguerMenu = document.getElementById("hamburguerMenu");
  hamburguerMenu.addEventListener("click", (event) => {
    aside.classList.toggle("menu__hidden");
  });

  body.addEventListener("click", (event) => {
    if (event.clientX > 250 && !aside.classList.contains("menu__hidden") && event.target != hamburguerMenu) {
      aside.classList.toggle("menu__hidden");
    }
  });
};

const logout = () => {
  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", (event) => {
    window.location.replace("../index.html");
  });
};

const showModal = () => {
  const sendSMS = document.getElementById("sendSMS");
  const modal = document.querySelector(".modalContainer");

  sendSMS.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.toggle("hidden");
    console.log("ok");
  });
};

const closeModal = () => {
  const closeModalButton = document.getElementById("closeModal");
  const modal = document.querySelector(".modalContainer");

  closeModalButton.addEventListener("click", (event) => {
    modal.classList.toggle("hidden");
  });
};

leftMenu();
logout();
showModal();
closeModal();

export { leftMenu };
