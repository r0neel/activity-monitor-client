function renderHome(){

}

function renderLoginForm(){
    const form = document.createElement("form");
    form.id = "login-form";
    form.classList.add("text-center", "login-form");
    form.autocomplete = "off";

    const usernameLabel = document.createElement("label");
    usernameLabel.for = "usernameLogin";
    usernameLabel.classList.add("form-label");
    usernameLabel.textContent = "Username:";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.id = "usernameLogin";
    usernameInput.name = "username";

    const usernameContainer = document.createElement("div");
    usernameContainer.appendChild(usernameLabel);
    usernameContainer.appendChild(usernameInput);

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

    form.appendChild(usernameContainer);
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

function renderNewHabitForm(){
    const form = document.createElement("form");
    form.id = "new-habit-form";
    form.classList.add();
    form.autocomplete = "off";

    const habitLabel = document.createElement("label");
    habitLabel.for = "habit";
    habitLabel.classList.add("form-label");
    habitLabel.textContent = "Habit"

    const habitInput = document.createElement("input");
    habitInput.type = "text";
    habitInput.name = "habit";
    habitInput.id = "habitInput";
    habitInput.placeholder = "Enter the name of the activity you wish to monitor";
    habitInput.classList.add("form-control");

    const goalLabel = document.createElement("label");
    goalLabel.for = "goal";
    goalLabel.classList.add("form-label");
    goalLabel.textContent = "Goal"

    const goalInput = document.createElement("input");
    goalInput.type = "number";
    goalInput.name = "goal";
    goalInput.id = "goal";
    goalInput.placeholder = "how much/many do you wish to complete";
    goalInput.classList.add("form-control");

    const goalUnitLabel = document.createElement("label");
    goalUnitLabel.for = "unit";
    goalUnitLabel.classList.add("form-label");

    const goalUnitSelect = document.createElement("select");
    goalUnitSelect.name = "unit";
    goalUnitSelect.id = "unit";
    goalUnitSelect. classList.add("form-select");

    const goalUnitArray = ["times","minutes", "hours","metres", "kilometres", "miles", "ounces", "cups", "millilitres", "litres", "pounds", "stones", "kilograms"];

    goalUnitArray.forEach(unit => {
        const goalUnitOption = document.createElement("option")
        goalUnitOption.value = unit;
        goalUnitOption.textContent = unit;
        
        goalUnitSelect.appendChild(goalUnitOption) 
    })

    const goalDurationLabel = document.createElement("label");
    goalDurationLabel.for = "duration";
    goalDurationLabel.classList.add("form-label");

    const goalDurationSelect = document.createElement("select");
    goalDurationSelect.name = "duration";
    goalDurationSelect.id = "duration";
    goalDurationSelect. classList.add("form-select");

    const goalDurationArray = ["hours","days", "weeks","months", "years"];

    goalDurationArray.forEach(unit => {
        const goalDurationOption = document.createElement("option")
        goalDurationOption.value = unit;
        goalDurationOption.textContent = unit;
        
        goalDurationSelect.appendChild(goalDurationOption) 
    })

    const submitAddTracker = document.createElement("button");
    submitAddTracker.type = "submit";
    submitAddTracker.classList.add("btn","btn-success");
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

    return form
}

function renderHabitList(){

}

function renderHabitInfo(){

}

module.exports = {
    renderHome, renderLoginForm, renderRegisterForm, renderNewHabitForm, renderHabitList, renderHabitInfo
};
