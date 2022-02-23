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
        ["hours", 3600000], 
        ["days", 86400000], 
        ["weeks", 604800000], 
        ["months", 2419200000], 
        ["years", 31536000000]
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
