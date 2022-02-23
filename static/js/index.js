const { navLinkHandler, formToggleHandler, pageLoadHandler } = require("./handlers");

function init(){
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", navLinkHandler);
    });

    const formToggle = document.querySelector("#form-toggle");
    formToggle.addEventListener("change", formToggleHandler);

    pageLoadHandler();
}

window.API_HOST = "http://localhost:3000";
init();
