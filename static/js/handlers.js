const { login, register, getHabits, updateHabit, newHabit, deleteHabit } = require("./requests");
const { showLoginForm, showRegisterForm, showHabits, showHome, updateNavigation, decodeToken, navLinkEvent, showNewHabitForm, showHabitInfo, showDashboard } = require("./helpers");

let habitsData = [];

function pageLoadHandler(){
    navLinkHandler(navLinkEvent("home"));
}

async function loginSubmitHandler(e){
    e.preventDefault();
    try {
        const formData = new FormData(e.target);
        const response = await login(Object.fromEntries(formData));
        localStorage.setItem("token", response.token);
        navLinkHandler(navLinkEvent("home"));
    } catch (err) {
        // bad login
        console.warn(err);
    }
}

async function registerSubmitHandler(e){
    e.preventDefault();
    try {
        const formData = new FormData(e.target);
        const response = await register(Object.fromEntries(formData));
        if(response.success){
            loginSubmitHandler(e);
        } else throw new Error(response);
    } catch (err) {
        // registration error
        console.warn(err);
    }
}

function formToggleHandler(e){
    e.preventDefault();
    const form = document.querySelector(".login-form");
    if(form.id.includes("login")){
        const form = showRegisterForm();
        form.addEventListener("submit", registerSubmitHandler);
    } else {
        const form = showLoginForm();
        form.addEventListener("submit", loginSubmitHandler);
    }
}

async function navLinkHandler(e){
    e.preventDefault();
    let page = e.target.dataset.page;
    let form;
    switch(page){
        case "logout":
            localStorage.removeItem("token");
        case "home":
            if(localStorage.getItem("token")){
                const { uid } = decodeToken();
                try {
                    habitsData = await getHabits(uid);
                    console.log(habitsData);
                    showDashboard();
                    const habitList = showHabits(habitData);
                    // to-do: add click event listeners
                    const habitForm = showNewHabitForm();
                    habitForm.addEventListener("submit", habitSubmitHandler);
                } catch (err) {
                    localStorage.removeItem("token");
                    navLinkHandler(e);
                    return;
                }
            } else {
                showHome();
            }
            break;
        case "login":
            form = showLoginForm();
            form.addEventListener("submit", loginSubmitHandler);
            break;
        case "register":
            form = showRegisterForm();
            form.addEventListener("submit", registerSubmitHandler);
            break;
    }
    updateNavigation();
}

function habitClickHandler(e){
    const hid = e.target.dataset.hid;
    const habitData = habitsData.find(habit => habit.id === hid);
    showHabitInfo(habitData);
}

function newHabitClickHandler(e){
    const form = showNewHabitForm();
    form.addEventListener("submit", habitSubmitHandler);
}

async function habitUpdateHandler(e){
    e.preventDefault();
    try {
        const { uid } = decodeToken();
        const hid = e.target.dataset.hid;
        const formData = new FormData(e.target);
        const updatedHabit = await updateHabit(uid, hid, Object.fromEntries(formData));
        
        let habitData = habitsData.find(habit => habit.id === hid);
        habitData.history = updatedHabit.history;
        e.target.click(); // to-do: select habit list item
    } catch (err) {
        // can't update habit progress
        console.warn(err);
    }
}

async function habitSubmitHandler(e){
    e.preventDefault();
    try {
        const { uid } = decodeToken();
        const formData = new FormData(e.target);
        await newHabit(uid, Object.fromEntries(formData));
        navLinkHandler(navLinkEvent("home"));
    } catch (err) {
        // can't create new habit
        console.warn(err);
    }
}

async function habitDeleteBtnHandler(e){
    e.preventDefault();
    try {
        const { uid } = decodeToken();
        const hid = e.target.dataset.hid;
        await deleteHabit(uid, hid);
        navLinkHandler(navLinkEvent("home"));
    } catch (err) {
        // can't delete habit
        console.warn(err);
    }
}

module.exports = {
    loginSubmitHandler, registerSubmitHandler, formToggleHandler,
    navLinkHandler, habitClickHandler, newHabitClickHandler,
    habitUpdateHandler, habitSubmitHandler, habitDeleteBtnHandler,
    pageLoadHandler
};
