const { navLinkHandler } = require("./handlers");

function init(){
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", navLinkHandler);
    });
}

window.API_HOST = "http://localhost:3000";
init();
