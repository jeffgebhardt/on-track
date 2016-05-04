var currentUser = new User();
if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
}

var firstName = currentUser.userName;
function greetUser(){
  // var h5 = document.createElement('h5');
  var capital = firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
  return capital;
};

// } else {
//   window.open('register.html', '_self');

document.getElementById('helloMessage').innerHTML = 'Hello ' + greetUser() + '.';
