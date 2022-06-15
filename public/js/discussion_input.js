const text1 = document.getElementById('the-user');
const button1 = document.getElementById('button1');
const output1 = document.getElementById('output1');

function output(){
    output1.innerHTML = text1.value;
}

button1.addEventListener('click', output);