const hamBurger = document.querySelector(".toggle-btn");
if (localStorage.getItem('fullName') === null) {
  // Nếu localStorage là null, chuyển hướng người dùng đến một trang khác hoặc thực hiện hành động phù hợp
  window.location.href = './Sign_In/signin.html'; // Thay đổi 'page_for_login.html' thành trang bạn muốn chuyển hướng đến
} else {
  // Nếu có dữ liệu trong localStorage, bạn có thể cho phép truy cập vào HTML này hoặc thực hiện hành động khác
  console.log('LocalStorage có dữ liệu');
}
const sidebarFooter = document.querySelector('.sidebar-footer');

sidebarFooter.addEventListener('click', function (event) {
  // Prevent default link behavior (if applicable)
  event.preventDefault();
  localStorage.clear();
  // Handle logout logic here
  console.log('Logout clicked'); // Example placeholder

  // You can implement confirmation dialogs, redirect to login page, etc.
  window.location.href = './Sign_In/signin.html'
});
hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
