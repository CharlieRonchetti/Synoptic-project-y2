const text1 = document.getElementById('the-user');
const text2 = document.getElementById('the-comment');
const button1 = document.getElementById('button1');
const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');

function output(){
    output1.innerHTML = 'Username: ' + text1.value;
    output2.innerHTML = text2.value;
}

button1.addEventListener('click', output);