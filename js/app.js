var currentUser = new User();
var displayImage = document.getElementById('pictures');
var slideShow = ['img/nonactivepatient.jpg','img/activepatient.jpg','img/malepatientdoctor.jpg','img/malepatiendoc2.jpg','img/nonactivepatient3.jpg','img/activepatient3.jpg'];
var displaying = 0;
var buttonDiv = document.getElementById('button-bar-div');

displayImage.src = slideShow[displaying];

function switchPicture() {
  displaying = displaying % 5;
  displayImage.src = '';
  displayImage.src = slideShow[displaying];
  displaying++;
}

function timeSwitch() {
  setInterval(switchPicture, 3000);
}

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'signin-button':
    console.log('signin-button pressed');
    userName = document.getElementById('emailInput').value;
    userPassword = document.getElementById('passwordInput').value;
    if(userName !== '' && userPassword !== ''){
      currentUser.signinUser(userName, userPassword);
    }

    break;
  case 'register-button':
    console.log('register-button pressed');
    window.open('register.html', '_self');
    break;
  }
}

var signIn = document.getElementById('signin-button');

function showSignin(){
  document.getElementById('animate-signin').style.visibility = 'visible';
  document.getElementById('animate-signin').style.display = 'block';
  document.getElementById('emailInput').focus();
}

signIn.addEventListener('click', showSignin);

function showButtonBar(){
  console.log('show hidden buttons');
  buttonDiv.style.visibility = 'visible';
  buttonDiv.style.display = 'block';
}

document.getElementById('animate-container').addEventListener('animationend', showButtonBar);

if (localStorage.getItem('OnTrack') === "true") {
  console.log('showing button bar');
  showButtonBar();
} else {
  document.getElementById('animate-container').classList.add('one-time');
  currentUser.usedMachine();
}

timeSwitch();

document.getElementById('signin-button').addEventListener('click', buttonHandler, false);
document.getElementById('register-button').addEventListener('click', buttonHandler, false);
