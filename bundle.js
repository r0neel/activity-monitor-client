(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./helpers":2,"./requests":5}],2:[function(require,module,exports){
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
    habitData = habitData.map(habitDataWrapper);
    const newHabitList = renderHabitList(habitData);
    const habitList = document.querySelector("#habit-list");
    habitList.replaceWith(newHabitList);
    return newHabitList;
}

function showHabitInfo(habitData){
    habitData = habitDataWrapper(habitData);
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

function toggleUpdateInput(){
    const input = document.querySelector("#update-prog-input");
    input.value = "";
    if(input.style.width === "0px") {
        input.style.width = "125px";
        input.focus();
    } else {
        input.style.width = "0px";
    }
}

function habitDataWrapper(habitData){
    const progress = calculateProgress(habitData);
    return {
        ...habitData,
        durationAsString: durationToString(habitData.duration),
        streak: calculateStreak(habitData),
        progress,
        progressPercentage: (progress / habitData.goal) * 100,
        timeUntilReset: millisecondsToString(calculateReset(habitData)),
        consistency: consistencyBars(habitData)
    };
}

function calculateHistoryTotals(habitData){
    const totalTotals = Math.ceil((Date.now() - habitData.creationDate) / habitData.duration);
    let history = new Array(totalTotals).fill(0);
    habitData.history.forEach(entry => {
        const index = Math.floor((entry.time - habitData.creationDate) / habitData.duration);
        history[index] += entry.amount;
    });
    return history;
}

function calculateStreak(habitData){
    let history = calculateHistoryTotals(habitData);
    let streak = 0;
    for(let i = history.length - 1; i >= 0; i--){
        if(history[i] >= habitData.goal){
            streak++;
        } else {
            return streak;
        }
    }
    return streak;
}

function consistencyBars(habitData){
    let history = calculateHistoryTotals(habitData);
    let unitPercentage = 100 / history.length;
    return history.map(entry => ({
        length: unitPercentage,
        color: entry >= habitData.goal ? "#0d6efd" : "#00000000"
    }));
}

function calculateProgress(habitData){
    let history = calculateHistoryTotals(habitData);
    return history[history.length - 1];
}

function durationToString(time){
    const durations = [
        ["hour", 3600000], 
        ["day", 86400000], 
        ["week", 604800000], 
        ["month", 2419200000], 
        ["year", 31536000000]
    ];
    let stringDuration = durations.find(d => d[1] === time);
    if(!stringDuration) throw new Error("Invalid goal duration.");
    return stringDuration[0];
}

function calculateReset(habitData){
    const now = Date.now();
    let interval = habitData.creationDate;
    while(now - interval >= 0) interval += habitData.duration;
    return interval - now;
}

function millisecondsToString(t){
    t = Math.trunc(t / 6e4);
    let minutes = t % 60;
    let hours = Math.trunc(t % (60 * 24) / 60);
    let days = Math.trunc(t / (60 * 24));
    let string = "";
    if(days) string += `${days} day${days === 1 ? "" : "s"} `;
    if(hours) string += `${hours} hour${hours === 1 ? "" : "s"} `;
    string += `${minutes} minute${minutes === 1 ? "" : "s"} `;
    return string.trim();
}

const testingExports = {
    showForm, isLoggedIn
};

module.exports = {
    showLoginForm, showRegisterForm, showNewHabitForm, showHabits, showHabitInfo, showHome, updateNavigation, decodeToken, navLinkEvent, showDashboard, toggleUpdateInput, 
    ...testingExports
};

},{"./render":4}],3:[function(require,module,exports){
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

window.API_HOST = "https://activity-monitor-server.herokuapp.com";
init();

},{"./handlers":1}],4:[function(require,module,exports){
function renderHome(){
    const content = document.createElement("main");
    content.id = "content";

    const heading = document.createElement("h1");
    heading.classList.add("text-center", "pt-5");
    heading.id = "trackYourHabits";
    heading.innerHTML = "TRACK YOUR <br> HABITS!";

    const headingContainer = document.createElement("div");
    headingContainer.appendChild(heading);
    content.appendChild(headingContainer);

    [
        ["What is Activity Monitor?", "Activitiy monitor is a webpage that allows anyone to track their personal habits. <br>We hope that Activity Monitor can aid in helping users remain accountable for habits <br>and to promote a positive lifestyle and reach their goals."],
        ["What am I able to track?", "Anything! Activity Monitor is designed for users to track whatever they wish <br>to track, being to studying a Japanese 1 hour a day, to wanting to lose 20 pounds <br> over 5 months. We have predefined units and timescales so you can spend less time <br> planning and more time completing your goals!."],
        ["Who made Activity Monitor?", "Activity Monitor was designed, created and deployed as a collaborative group project <br> as part of lap 2 of the training course of futureproof. The project occured over the <br> the span of 1 week and was created by team Ultra-Instinct."]
    ].forEach(text => {
        const container = document.createElement("div");

        const heading = document.createElement("h3");
        heading.classList.add("text-center", "pt-5");
        heading.innerHTML = text[0];
        container.appendChild(heading);

        const pContainer = document.createElement("div");
        const p = document.createElement("p");
        p.classList.add("text-center");
        p.innerHTML = text[1];
        pContainer.appendChild(p);
        container.appendChild(pContainer);

        content.appendChild(container);
    });

    return content;
}

function renderLoginForm(){
    const form = document.createElement("form");
    form.id = "login-form";
    form.classList.add("text-center", "login-form");
    form.autocomplete = "off";

    const emailLabel = document.createElement("label");
    emailLabel.for = "emailLogin";
    emailLabel.classList.add("form-label");
    emailLabel.textContent = "Email:";

    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.id = "emailLogin";
    emailInput.name = "email";

    const emailContainer = document.createElement("div");
    emailContainer.appendChild(emailLabel);
    emailContainer.appendChild(emailInput);

    const passwordLabel = document.createElement("label");
    passwordLabel.for = "passwordLogin";
    passwordLabel.classList.add("form-label");
    passwordLabel.textContent = "Password:";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "passwordLogin";
    passwordInput.name = "password";

    const passwordContainer = document.createElement("div");
    passwordContainer.appendChild(passwordLabel);
    passwordContainer.appendChild(passwordInput);

    const submitInput = document.createElement("input");
    submitInput.type = "submit";
    submitInput.classList.add("btn", "btn-dark");
    submitInput.id = "loginSubmit";
    submitInput.value = "Log In";

    const submitContainer = document.createElement("div");
    submitContainer.appendChild(submitInput);

    form.appendChild(emailContainer);
    form.appendChild(passwordContainer);
    form.appendChild(submitContainer);

    return form;
}

function renderRegisterForm(){
    const form = document.createElement("form");
    form.id = "register-form";
    form.classList.add("text-center", "login-form");
    form.autocomplete = "off";

    const emailLabel = document.createElement("label");
    emailLabel.for = "emailRegister";
    emailLabel.classList.add("form-label");
    emailLabel.textContent = "Email:";

    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.id = "emailRegister";
    emailInput.name = "email";

    const emailContainer = document.createElement("div");
    emailContainer.appendChild(emailLabel);
    emailContainer.appendChild(emailInput);

    const usernameLabel = document.createElement("label");
    usernameLabel.for = "usernameRegister";
    usernameLabel.classList.add("form-label");
    usernameLabel.textContent = "Username:";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.id = "usernameRegister";
    usernameInput.name = "username";

    const usernameContainer = document.createElement("div");
    usernameContainer.appendChild(usernameLabel);
    usernameContainer.appendChild(usernameInput);

    const passwordLabel = document.createElement("label");
    passwordLabel.for = "passwordRegister";
    passwordLabel.classList.add("form-label");
    passwordLabel.textContent = "Password:";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "passwordRegister";
    passwordInput.name = "password";

    const passwordContainer = document.createElement("div");
    passwordContainer.appendChild(passwordLabel);
    passwordContainer.appendChild(passwordInput);

    const passwordConfirmLabel = document.createElement("label");
    passwordConfirmLabel.for = "passwordConfirmRegister";
    passwordConfirmLabel.classList.add("form-label");
    passwordConfirmLabel.textContent = "Confirm password:";

    const passwordConfirmInput = document.createElement("input");
    passwordConfirmInput.type = "password";
    passwordConfirmInput.id = "passwordConfirmRegister";
    passwordConfirmInput.name = "passwordConfirm";

    const passwordConfirmContainer = document.createElement("div");
    passwordConfirmContainer.appendChild(passwordConfirmLabel);
    passwordConfirmContainer.appendChild(passwordConfirmInput);

    const submitInput = document.createElement("input");
    submitInput.type = "submit";
    submitInput.classList.add("btn", "btn-dark");
    submitInput.id = "registerSubmit";
    submitInput.value = "Sign Up";

    const submitContainer = document.createElement("div");
    submitContainer.appendChild(submitInput);

    form.appendChild(emailContainer);
    form.appendChild(usernameContainer);
    form.appendChild(passwordContainer);
    form.appendChild(passwordConfirmContainer);
    form.appendChild(submitContainer);

    return form;
}

function renderDashboard(){
    const content = document.createElement("main");
    content.id = "content";

    const habitList = document.createElement("section");
    habitList.id = "habit-list";
    content.appendChild(habitList);

    const cardContainer = document.createElement("article");
    content.appendChild(cardContainer);

    const card = document.createElement("div");
    card.id = "trackerCard";
    card.classList.add("card");
    cardContainer.appendChild(card);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    return content;
}

function renderNewHabitForm(){
    const form = document.createElement("form");
    form.id = "new-habit-form";
    form.autocomplete = "off";

    const habitLabel = document.createElement("label");
    habitLabel.for = "habitInput";
    habitLabel.classList.add("form-label");
    habitLabel.textContent = "Habit";

    const habitInput = document.createElement("input");
    habitInput.type = "text";
    habitInput.name = "habit";
    habitInput.id = "habitInput";
    habitInput.placeholder = "Enter the name of the activity you wish to monitor";
    habitInput.classList.add("form-control");

    const goalLabel = document.createElement("label");
    goalLabel.for = "goalInput";
    goalLabel.classList.add("form-label");
    goalLabel.textContent = "Goal";

    const goalInput = document.createElement("input");
    goalInput.type = "number";
    goalInput.name = "goal";
    goalInput.id = "goalInput";
    goalInput.placeholder = "how much/many do you wish to complete";
    goalInput.classList.add("form-control");

    const goalUnitLabel = document.createElement("label");
    goalUnitLabel.for = "unitInput";
    goalUnitLabel.classList.add("form-label");
    goalUnitLabel.textContent = "Unit of goal";

    const goalUnitSelect = document.createElement("select");
    goalUnitSelect.name = "unit";
    goalUnitSelect.id = "unitInput";
    goalUnitSelect.classList.add("form-select");

    const goalUnitArray = ["times", "minutes", "hours", "metres", "kilometres", "miles", "ounces", "cups", "millilitres", "litres", "pounds", "stones", "kilograms"];

    goalUnitArray.forEach(unit => {
        const goalUnitOption = document.createElement("option")
        goalUnitOption.value = unit;
        goalUnitOption.textContent = unit;
        
        goalUnitSelect.appendChild(goalUnitOption);
    });

    const goalDurationLabel = document.createElement("label");
    goalDurationLabel.for = "durationInput";
    goalDurationLabel.classList.add("form-label");
    goalDurationLabel.textContent = "Goal duration:";

    const goalDurationSelect = document.createElement("select");
    goalDurationSelect.name = "duration";
    goalDurationSelect.id = "durationInput";
    goalDurationSelect. classList.add("form-select");

    const goalDurationArray = [
        ["hour", 3600000], 
        ["day", 86400000], 
        ["week", 604800000], 
        ["month", 2419200000], 
        ["year", 31536000000]
    ];

    goalDurationArray.forEach(unit => {
        const goalDurationOption = document.createElement("option");
        goalDurationOption.value = unit[1];
        goalDurationOption.textContent = unit[0];
        
        goalDurationSelect.appendChild(goalDurationOption);
    })

    const submitAddTracker = document.createElement("input");
    submitAddTracker.type = "submit";
    submitAddTracker.classList.add("btn", "btn-success");
    submitAddTracker.id = "submitAddTracker";
    submitAddTracker.value = "Add tracker";

    form.appendChild(habitLabel);
    form.appendChild(habitInput);
    form.appendChild(goalLabel);
    form.appendChild(goalInput);
    form.appendChild(goalUnitLabel);
    form.appendChild(goalUnitSelect);
    form.appendChild(goalDurationLabel);
    form.appendChild(goalDurationSelect);
    form.appendChild(submitAddTracker);

    return form;
}

// render list of habits with details
function renderHabitList(habitData){
    const container = document.createElement("section");
    container.id = "habit-list";

    // table
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    container.appendChild(table);

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const tr = document.createElement("tr");
    tr.classList.add("text-center");
    thead.appendChild(tr);

    // table headings
    [
        "Habit", 
        "Progress", 
        "Goal", 
        "Progression"
    ].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        tr.appendChild(th);
    });

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // table rows
    habitData.forEach(data => {
        const row = document.createElement("tr");
        row.dataset.hid = data._id;

        // first three columns
        [
            data.habit, // habit name
            `${data.progress} ${data.unit}`, // progress
            `${data.goal} ${data.unit}/${data.durationAsString}` // goal
        ].forEach((text, i) => {
            const col = document.createElement("td");

            if(i === 0) {
                col.classList.add("text-start");
            } else {
                col.classList.add("text-end");
            }

            col.textContent = text;
            row.appendChild(col);
        });

        // progress bar column
        const progCol = document.createElement("td");
        progCol.classList.add("align-middle");
        row.appendChild(progCol);

        const progContainer = document.createElement("div");
        progContainer.classList.add("progress");
        progCol.appendChild(progContainer);

        const progBar = document.createElement("div");
        progBar.classList.add("progress-bar");
        progBar.role = "progressbar";
        progBar.setAttribute("aria-valuenow", data.progressPercentage);
        progBar.setAttribute("aria-valuemin", 0);
        progBar.setAttribute("aria-valuemax", 100);
        progBar.style.width = `${data.progressPercentage}%`;
        progContainer.appendChild(progBar);

        tbody.appendChild(row);
    });

    return container;
}

// render stats for single habit
function renderHabitInfo(habitData){
    const container = document.createElement("div");
    container.classList.add("card-body");
    container.innerHTML = "<h2>Stats</h2>"; // heading

    // delete button
    const delBtn = document.createElement("button");
    delBtn.id = "delete-btn";
    delBtn.classList.add("btn", "btn-danger");
    delBtn.textContent = "Delete";
    delBtn.dataset.hid = habitData._id;
    container.appendChild(delBtn);

    // table
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.classList.add("table", "table-striped");
    table.appendChild(tbody);
    container.appendChild(table);

    // habit name display row
    const habitRow = document.createElement("tr");
    const habitLabelCol = document.createElement("td");
    habitLabelCol.textContent = "Habit";
    habitRow.appendChild(habitLabelCol);
    const habitCol = document.createElement("td");
    habitCol.textContent = habitData.habit;
    habitRow.appendChild(habitCol);
    tbody.appendChild(habitRow);

    // current progress display row + update form
    const progressRow = document.createElement("tr");
    const progressLabelCol = document.createElement("td");
    progressLabelCol.textContent = "Progress";
    progressLabelCol.classList.add("align-middle");
    progressRow.appendChild(progressLabelCol);
    const progressCol = document.createElement("td");
    progressCol.textContent = `${habitData.progress} ${habitData.unit}`;
    progressRow.appendChild(progressCol);
    const progressInput = document.createElement("input");
    progressInput.id = "update-prog-input";
    progressInput.type = "text";
    progressInput.placeholder = "add progress";
    progressInput.style.width = "0px";
    progressCol.appendChild(progressInput);
    const progressInputButton = document.createElement("button");
    progressInputButton.id = "update-btn";
    progressInputButton.classList.add("btn", "btn-dark", "btn-sm");
    progressInputButton.textContent = "+";
    progressInputButton.dataset.hid = habitData._id;
    progressCol.appendChild(progressInputButton);
    tbody.appendChild(progressRow);

    // goal display row
    const goalRow = document.createElement("tr");
    const goalLabelCol = document.createElement("td");
    goalLabelCol.textContent = "Goal";
    goalRow.appendChild(goalLabelCol);
    const goalCol = document.createElement("td");
    goalCol.textContent = `${habitData.goal} ${habitData.unit}/${habitData.durationAsString}`;
    goalRow.appendChild(goalCol);
    tbody.appendChild(goalRow);

    // progress bar display row
    const progbarRow = document.createElement("tr");
    const progbarLabelCol = document.createElement("td");
    progbarLabelCol.textContent = "Progression";
    progbarRow.appendChild(progbarLabelCol);

    const progCol = document.createElement("td");
    progCol.classList.add("align-middle");
    progbarRow.appendChild(progCol);

    const progContainer = document.createElement("div");
    progContainer.classList.add("progress");
    progCol.appendChild(progContainer);

    const progBar = document.createElement("div");
    progBar.classList.add("progress-bar");
    progBar.role = "progressbar";
    progBar.setAttribute("aria-valuenow", habitData.progressPercentage);
    progBar.setAttribute("aria-valuemin", 0);
    progBar.setAttribute("aria-valuemax", 100);
    progBar.style.width = `${habitData.progressPercentage}%`;
    progContainer.appendChild(progBar);

    tbody.appendChild(progbarRow);

    // current streak display row
    const streakRow = document.createElement("tr");
    const streakLabelCol = document.createElement("td");
    streakLabelCol.textContent = "Streak";
    streakRow.appendChild(streakLabelCol);
    const streakCol = document.createElement("td");
    streakCol.textContent = `${habitData.streak} ${habitData.durationAsString}`;
    streakRow.appendChild(streakCol);
    tbody.appendChild(streakRow);

    // time until reset display row
    const resetRow = document.createElement("tr");
    const resetLabelCol = document.createElement("td");
    resetLabelCol.textContent = "Next reset";
    resetRow.appendChild(resetLabelCol);
    const resetCol = document.createElement("td");
    resetCol.textContent = `${habitData.timeUntilReset}`;
    resetRow.appendChild(resetCol);
    tbody.appendChild(resetRow);

    // consistency bar display row
    const consistencyBarRow = document.createElement("tr");
    const consistencyBarLabelCol = document.createElement("td");
    consistencyBarLabelCol.textContent = "Consistency";
    consistencyBarRow.appendChild(consistencyBarLabelCol);

    const consistencyCol = document.createElement("td");
    consistencyCol.classList.add("align-middle");
    consistencyBarRow.appendChild(consistencyCol);

    const consistencyContainer = document.createElement("div");
    consistencyContainer.classList.add("progress");
    consistencyCol.appendChild(consistencyContainer);

    habitData.consistency.forEach(segment => {
        const consistencyBar = document.createElement("div");
        consistencyBar.classList.add("progress-bar");
        consistencyBar.role = "progressbar";
        consistencyBar.setAttribute("aria-valuenow", segment.length);
        consistencyBar.setAttribute("aria-valuemin", 0);
        consistencyBar.setAttribute("aria-valuemax", 100);
        consistencyBar.style.width = `${segment.length}%`;
        consistencyBar.style.backgroundColor = segment.color;
        consistencyContainer.appendChild(consistencyBar);
    });

    tbody.appendChild(consistencyBarRow);

    return container;
}

module.exports = {
    renderHome, renderLoginForm, renderRegisterForm, renderNewHabitForm, renderHabitList, renderHabitInfo, renderDashboard
};

},{}],5:[function(require,module,exports){
function login({email, password}){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            };
            const response = await fetch(`${API_HOST}/auth/login`, options);
            const json = await response.json();
            if(!json.success) throw new Error(json.error);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function register({username, email, password, passwordConfirm}){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, passwordConfirm })
            };
            const response = await fetch(`${API_HOST}/auth/register`, options);
            const json = await response.json();
            if(response.status !== 201) throw new Error(json.error);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function deleteUser(uid){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "DELETE",
                headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`})
            }
            const response = await fetch(`${API_HOST}/users/${uid}`, options);
            if(response.status !== 204) throw new Error("Could not delete user.");
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

function getHabits(uid){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`})
            }
            const response = await fetch(`${API_HOST}/users/${uid}/habits`, options);
            const json = await response.json();
            if(response.status !== 200) throw new Error(json);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function newHabit(uid, {habit, goal, unit, duration}){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "POST",
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    habit, 
                    goal: parseInt(goal), 
                    unit, 
                    duration: parseInt(duration)
                })
            };
            const response = await fetch(`${API_HOST}/users/${uid}/habits`, options);
            const json = await response.json();
            if(!json.acknowledged) throw new Error(json);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function updateHabit(uid, hid, {progress}){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "PATCH",
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ progress })
            };
            const response = await fetch(`${API_HOST}/users/${uid}/habits/${hid}`, options);
            const json = await response.json();
            if(response.status !== 200) throw new Error(json);
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function deleteHabit(uid, hid){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "DELETE",
                headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`})
            };
            const response = await fetch(`${API_HOST}/users/${uid}/habits/${hid}`, options);
            if(response.status !== 204) throw new Error("Could not delete habit.");
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    login, register, deleteUser, getHabits, newHabit, updateHabit, deleteHabit
};

},{}]},{},[3]);
