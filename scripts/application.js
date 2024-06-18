const leftMenu = () => {
  const body = document.querySelector("body");
  const aside = document.getElementById("leftMenu");
  const hamburguerMenu = document.getElementById("hamburguerMenu");
  hamburguerMenu.addEventListener("click", (event) => {
    aside.classList.toggle("menu__hidden");
  });

  body.addEventListener("click", (event) => {
    if (event.clientX > 250 && !aside.classList.contains("menu__hidden")) {
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

leftMenu();
logout();

export { leftMenu };
