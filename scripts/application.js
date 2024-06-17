const leftMenu = () => {
  const aside = document.getElementById("leftMenu");
  const hamburguerMenu = document.getElementById("hamburguerMenu");

  // const menuSection = document.createElement("section");
  // const divButtons = document.createElement("div");
  // const divCloseButton = document.createElement("div");
  // const buttonClass = document.createElement("button");
  // const buttonSecretary = document.createElement("button");
  // const buttonTeacher = document.createElement("button");
  // const buttonDocuments = document.createElement("button");
  // const buttonClose = document.createElement("button");
  // const closeIcon = document.createElement("img");

  // buttonClass.innerText = "Classes";
  // buttonSecretary.innerText = "Secretaria";
  // buttonTeacher.innerText = "Professores";
  // buttonDocuments.innerText = "Documentos";
  // buttonClose.innerText = "Fechar";

  // closeIcon.src = "../assets/icons/xmark-solid.svg";

  // buttonClose.id = "closeMenuButton";

  // menuSection.classList.add("menu", "menu__hidden");
  // divButtons.classList.add("menu__buttons");

  // buttonClose.append(closeIcon);

  // divButtons.append(
  //   buttonClass,
  //   buttonSecretary,
  //   buttonTeacher,
  //   buttonDocuments
  // );
  // divCloseButton.append(buttonClose);

  // menuSection.append(divButtons, divCloseButton);
  // aside.append(menuSection);

  hamburguerMenu.addEventListener("click", (event) => {
    aside.classList.toggle("menu__hidden");
  });

  aside.addEventListener("click", (event) => {
    if (event.currentTarget != event.target) {
      menuSection.classList.toggle("menu__hidden");
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
