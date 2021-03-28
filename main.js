const Hamburger = document.querySelector(".hamburger");
const Navbar = document.querySelector(".navbar");
const Logo = document.querySelector("#logo");



Hamburger.addEventListener("click", ()=> {
    Hamburger.classList.toggle("is-active");

    if (window.innerWidth <= 568) {
        Logo.classList.toggle("logo-display");
    }

    const Sidebar = document.querySelector(".sidebar");
    const SidebarChildren = document.querySelector(".sidebar").children;
    Sidebar.classList.toggle("active");
    for (let i = 0; i < SidebarChildren.length; i++) {

        if (SidebarChildren[i].style.display === "block") {
            SidebarChildren[i].style.display = "none"
        }
         else {
            SidebarChildren[i].style.display = "block"
        }
    }

})
