const { login, register, getHabits, updateHabit, newHabit, deleteHabit } = require("./requests");
const { showLoginForm, showRegisterForm, showHabits, showHome, updateNavigation, decodeToken, navLinkEvent, showNewHabitForm, showHabitInfo, showDashboard, toggleUpdateInput } = require("./helpers");

let habitsData = [];

function pageLoadHandler(){
    navLinkHandler(navLinkEvent("home"));
}

async function loginSubmitHandler(e){
    e.preventDefault();
    try {
        const formData = Object.fromEntries(new FormData(e.target));

        for(let key in formData){
            if(formData[key] === ""){
                throw new Error("Required fields missing.");
            }
        }
        
        const response = await login(formData);
        localStorage.setItem("token", response.token.slice(7));
        navLinkHandler(navLinkEvent("home"));
        document.querySelector("#login-modal").click();
    } catch (err) {
        // bad login
        console.warn(err);
    }
}

async function registerSubmitHandler(e){
    e.preventDefault();
    try {
        const formData = Object.fromEntries(new FormData(e.target));

        for(let key in formData){
            if(formData[key] === ""){
                throw new Error("Required fields missing.");
            }
        }

        if(formData.password !== formData.passwordConfirm){
            throw new Error("Passwords don't match.");
        }

        if(formData.password.length < 8){
            throw new Error("Password must be at least 8 characters long.");
        }

        if(formData.password.toLowerCase() === formData.password){
            throw new Error("Password must contain at least 1 uppercase char.");
        }

        const response = await register(formData);
        if(response === "User created"){
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
                    showDashboard();

                    const habitList = showHabits(habitsData);
                    const rows = habitList.querySelectorAll("tbody > tr");
                    rows.forEach(row => {
                        row.addEventListener("click", habitClickHandler);
                    });

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
    const hid = e.target.parentElement.dataset.hid;
    const habitData = habitsData.find(habit => habit._id === hid);
    const habitInfo = showHabitInfo(habitData);
    const delBtn = habitInfo.querySelector("#delete-btn");
    delBtn.addEventListener("click", habitDeleteBtnHandler);
    const updateBtn = habitInfo.querySelector("#update-btn");
    updateBtn.addEventListener("click", habitUpdateHandler);
}

function newHabitClickHandler(e){
    const form = showNewHabitForm();
    form.addEventListener("submit", habitSubmitHandler);
}

async function habitUpdateHandler(e){
    e.preventDefault();
    const input = e.target.previousElementSibling;
    const value = input.value.trim();
    if(value){
        try {
            const progress = parseInt(value);
            if(isNaN(progress)) throw new Error("Amount must be a number.");
            if(progress <= 0) throw new Error("Amount must be positive.");
            const { uid } = decodeToken();
            const hid = e.target.dataset.hid;
            const updatedHabit = (await updateHabit(uid, hid, {progress})).value;
            
            let habitData = habitsData.find(habit => habit._id === hid);
            habitData.history = updatedHabit.history;
            habitClickHandler({
                target: {
                    parentElement: {
                        dataset: { hid }
                    }
                }
            });
        } catch (err) {
            // can't update habit progress
            console.warn(err);
        }
    } else {
        toggleUpdateInput();
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
