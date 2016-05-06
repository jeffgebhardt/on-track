var currentUser = new User();
var displayImage = document.getElementById('pictures');
var slideShow = ['img/nonactivepatient.jpg','img/activepatient.jpg','img/malepatiendoc2.jpg','img/nonactivepatient3.jpg','img/yogapatient.jpg'];
var displaying = 0;
var buttonDiv = document.getElementById('button-bar-div');

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
    if(userName !== "" && userPassword !== ""){
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
}

signIn.addEventListener('click', showSignin);

function showButtonBar(){
  console.log('show hidden buttons');
  buttonDiv.style.visibility = 'visible';
}

document.getElementById('animate-container').addEventListener('animationend', showButtonBar);
// var signIn = document.getElementById('signin-button');
//
// function functionX(){
//   signIn.style.WebkitAnimation = 'signin';
// }
//
// signIn.addEventListener('click', functionX);

// if (localStorage.getItem('OnTrack-SignedIn')){
  // console.log('OnTrack - we have been here');
  // show the sign-in button.

// document.getElementById('nameInput').style.visibility = 'visible';
// document.getElementById('nameLabel').style.visibility = 'visible';
// document.getElementById('signin-button').style.visibility = 'visible';
  // currentUser.getUserDataFromStorage();
  // window.open('daily.html', '_self');

// } else {
//   //first time here - hide or show which buttons?
//   document.getElementById('nameInput').style.visibility = 'hidden';
//   document.getElementById('nameLabel').style.visibility = 'hidden';
//   document.getElementById('signin-button').style.visibility = 'hidden';

// }

timeSwitch();

document.getElementById('signin-button').addEventListener('click', buttonHandler, false);
document.getElementById('register-button').addEventListener('click', buttonHandler, false);
