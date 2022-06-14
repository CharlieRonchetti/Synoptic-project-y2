const form = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

var accounts;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        accounts = await loadData();
    } catch(e) {
        console.log("Error");
        console.log(e);
    }

    console.log(accounts);
})

form.addEventListener('submit', e => {
    if(!validateInputs(accounts)) {
        e.preventDefault();
    }
});

function checkLoginDetails(username, password, account_json) {
    var valid = false;

    for(let i = 0; i < account_json.users.length; i++){
        if(username.toLowerCase() == account_json.users[i].username.toLowerCase()){
            if(password.toLowerCase() == account_json.users[i].password.toLowerCase()){
                valid = true;
            }
        }
    }
    return valid;
}

async function loadData() {
    const data = await fetch("accounts/json");
    const accounts = await data.json();

    return accounts;
}

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function validateInputs(account_json) {
    const usernameTrim = username.value.trim();
    const passwordTrim = password.value.trim();

    let valid = true;

    if(usernameTrim === '') {
        setError(username, 'Username is required')
        valid = false;
    } else {
        setSuccess(username);
    }

    if(passwordTrim === '') {
        setError(password, 'Password is required')
        valid = false;
    } else if(!checkLoginDetails(usernameTrim, passwordTrim, account_json)) {
        setError(password, 'Invalid username/password');
        valid = false;
    } else {
        setSuccess(password);
    }

    return valid;
}