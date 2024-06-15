const login = () => {
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("../pages/dashboard.html");
  });
};
login();
