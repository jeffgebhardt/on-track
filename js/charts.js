var retrievedData = localStorage.getItem('OnTrack-currentUser');
var currentUserTwo = JSON.parse(retrievedData);
var userGreeting = document.getElementById('user-greeting');
var firstName = currentUserTwo[0];

(function greetUser(){
  var h5 = document.createElement('h5');
  h5.textContent = 'Hi ' + firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
  userGreeting.appendChild(h5);
})();
