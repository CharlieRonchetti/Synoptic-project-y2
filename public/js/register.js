const form = document.getElementById('register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const terms = document.getElementById('terms');

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

function checkDuplicateData(value, field, account_json) {
    var duplicate = false;

    if(field === 'username') {
        for(let i = 0; i < account_json.users.length; i++){
            if(value.toLowerCase() == account_json.users[i].username.toLowerCase()){
                duplicate = true;
            }
        }
    } else if(field === 'email') {
        for(let i = 0; i < account_json.users.length; i++){
            if(value.toLowerCase() == account_json.users[i].email.toLowerCase()){
                duplicate = true;
            }
        }
    } else if (field === 'password') {
        for(let i = 0; i < account_json.users.length; i++){
            if(value.toLowerCase() == account_json.users[i].password.toLowerCase()){
                duplicate = true;
            }
        }
    } 
    return duplicate;
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
    const emailTrim = email.value.trim();
    const passwordTrim = password.value.trim();

    let valid = true;

    if(usernameTrim === '') {
        setError(username, 'Username is required*')
        valid = false;
    } else if(checkDuplicateData(usernameTrim, 'username', account_json)) {
        setError(username, 'Username in use, please choose a different username')
        valid = false;
    } else {
        setSuccess(username)
    }

    if(emailTrim === '') {
        setError(email, 'Email is required*')
        valid = false;
    } else if(checkDuplicateData(emailTrim, 'email', account_json)) {
        setError(email, 'Email in use, please choose a different email*')
        valid = false;
    } else {
        setSuccess(email);
    }

    if(passwordTrim === '') {
        setError(password, 'Password is required*')
        valid = false;
    } else {
        setSuccess(password);
    }

    if(!terms.checked) {
        setError(terms, 'Please accept the terms above*')
    } else{
        setSuccess(terms)
    }

    return valid;
}

