const form = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

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

function validateInputs() {
    const usernameTrim = username.value.trim();
    const passwordTrim = password.value.trim();

    if(usernameTrim === '') {
        setError(username, 'Username is required')
    } else {
        setSuccess(username);
    }

    if(passwordTrim === '') {
        setError(password, 'Password is required')
    } else {
        setSuccess(password);
    }
}