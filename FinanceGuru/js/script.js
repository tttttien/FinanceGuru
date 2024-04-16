//Sidebar trigger

var sidebarOpen=false;
var sidebar=document.getElementById("sidebar");

function openSidebar(){
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen=true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen=false;
    }
}

/* Course */ 
// JavaScript để điều khiển hiển thị/ẩn nội dung dropdown
document.addEventListener("DOMContentLoaded", function() {
    var dropdowns = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      dropdown.addEventListener("click", function() {
        this.classList.toggle("open");
      });
    }
  });