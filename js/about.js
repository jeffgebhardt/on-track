var currentUser = new User();
if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
}

var firstName = currentUser.userName;
function greetUser(){
  var capital = firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
  return capital;
};

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'signout-button':
    currentUser.userSignedOut();
    break;

  }
}
document.getElementById('signout-button').addEventListener('click',buttonHandler, false);

document.getElementById('helloMessage').innerHTML = 'Hello ' + greetUser() + '.';
