const hamBurger = document.querySelector(".toggle-btn");
// const isLoggedIn = localStorage.getItem('isLoggedIn');

// if (isLoggedIn === null || isLoggedIn === undefined) {
//   window.location.href = './Sign_In/signin.html'
// } else {
//   // Value exists, allow access to HTML
// }
hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
