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
