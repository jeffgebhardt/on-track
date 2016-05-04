var currentUser = new User();

function switchPicture() {
  var patientPicture = document.getElementsById('patient-picture').src = 'img/activepatient.png';
}

function timeSwitch() {
  setInterval(switchPicture, 3000);
}

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
  window.open('daily.html', '_self');
}

timeSwitch();
