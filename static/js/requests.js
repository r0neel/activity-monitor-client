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

function updateHabit(uid, hid, {amount}){
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('token')}`}),
                body: JSON.stringify({ amount })
            };
            const response = await fetch(`${API_HOST}/users/${uid}/habits/${hid}`, options);
            const json = await response.json();
            if(!json.amount) throw new Error(json);
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
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    login, register, deleteUser, getHabits, newHabit, updateHabit, deleteHabit
};
