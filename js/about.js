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

document.getElementById('helloMessage').innerHTML = 'Hello ' + greetUser() + '.';
