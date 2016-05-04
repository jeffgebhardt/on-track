var currentUser = new User();


function switchPicture() {
  document.getElementById('patient1').src = 'img/activepatient.png';
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
    userName = document.getElementById('nameInput').value;
    console.log(userName);
    currentUser.signinUser(userName);
    break;

  }
}

if (localStorage.getItem('OnTrack')){
  console.log('OnTrack - we have been here');
  // show the sign-in button.

  document.getElementById('nameInput').style.visibility = 'visible';
  document.getElementById('nameLabel').style.visibility = 'visible';
  document.getElementById('signin-button').style.visibility = 'visible';
  // currentUser.getUserDataFromStorage();
  // window.open('daily.html', '_self');

} else {
  //first time here - hide or show which buttons?
  document.getElementById('nameInput').style.visibility = 'hidden';
  document.getElementById('nameLabel').style.visibility = 'hidden';
  document.getElementById('signin-button').style.visibility = 'hidden';

}

timeSwitch();

document.getElementById('signin-button').addEventListener('click', buttonHandler, false);
