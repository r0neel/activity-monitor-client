const { renderLoginForm, renderRegisterForm, renderHabitList, renderHome, renderNewHabitForm, renderHabitInfo, renderDashboard } = require("./render");

function showHome(){
    const newContent = renderHome();
    const content = document.querySelector("#content");
    content.replaceWith(newContent);
    return newContent;
}

function showDashboard(){
    const newContent = renderDashboard();
    const content = document.querySelector("#content");
    content.replaceWith(newContent);
    return content;
}

function showHabits(habitData){
    const newHabitList = renderHabitList(habitData);
    const habitList = document.querySelector("#habit-list");
    habitList.replaceWith(newHabitList);
    return newHabitList;
}

function showHabitInfo(habitData){
    const newInfo = renderHabitInfo(habitData);
    const cardBody = document.querySelector(".card-body");
    cardBody.replaceChildren(newInfo);
    return newInfo;
}

function showLoginForm(){
    const newForm = renderLoginForm();
    document.querySelector("#login-modal h3").textContent = "Log In";
    document.querySelector("#form-toggle").checked = true;
    return module.exports.showForm(newForm);
}

function showRegisterForm(){
    const newForm = renderRegisterForm();
    document.querySelector("#login-modal h3").textContent = "Sign Up";
    document.querySelector("#form-toggle").checked = false;
    return module.exports.showForm(newForm);
}

function showNewHabitForm(){
    const newForm = renderNewHabitForm();
    const cardBody = document.querySelector(".card-body");
    cardBody.replaceChildren(newForm);
    return newForm;
}

function showForm(newForm){
    const form = document.querySelector("form");
    form.replaceWith(newForm);
    return newForm;
}

function updateNavigation(){
    const newLinks = module.exports.isLoggedIn() ? ["logout"] : ["login", "register"];
    const links = document.querySelectorAll("nav li > a");
    links.forEach(link => {
        if(newLinks.includes(link.dataset.page)){
            link.parentElement.classList.remove("d-none");
        } else {
            link.parentElement.classList.add("d-none");
        }
    });
}

function isLoggedIn(){
    const token = localStorage.getItem("token");
    if(token){
        try {
            return !!jwt_decode(token);
        } catch (error) {
            return false;
        }
    }
    return false;
}

function decodeToken(){
    const token = localStorage.getItem("token");
    return jwt_decode(token);
}

function navLinkEvent(page){
    return {
        target: {
            dataset: {page}
        },
        preventDefault: new Function()
    }
}

const testingExports = {
    showForm, isLoggedIn
};

module.exports = {
    showLoginForm, showRegisterForm, showNewHabitForm, showHabits, showHabitInfo, showHome, updateNavigation, decodeToken, navLinkEvent, showDashboard, 
    ...testingExports
};
