var registeredUsers = [];
var currentUserInfo = [];
var currentUserData = [];

var currentUser = new User();

function User(){
  this.userName = '';
  this.userEmail = '';

  this.dailyWaterIntakeGoal = 0;
  this.dailyWaterIntake = 0;

  this.dailyProteinIntakeGoal = 0;
  this.dailyProteinIntake = 0;

  this.dailyExerciseGoal = 0;
  this.dailyExercise = 0;

  this.currentDate = new Date();
  var today = this.currentDate.valueOf();
  this.currentDateNumber = Math.floor(today / 100000) * 100000;
  console.log('creating User ' + this.currentDate.valueOf() + ' ' + this.currentDateNumber);
}

User.prototype.getUserDataFromStorage = function() {
//  initialize user name and goals
  console.log('getUserDataFromStorage');
  if (localStorage.getItem('OnTrack-currentUser')) {
    var loadUserData = JSON.parse(localStorage.getItem('OnTrack-currentUser'));

    this.userName = loadUserData.userName;
    this.userEmail = loadUserData.userEmail;

    this.dailyWaterIntakeGoal = loadUserData.dailyWaterIntakeGoal;
    this.dailyProteinIntakeGoal = loadUserData.dailyProteinIntakeGoal;
    this.dailyExerciseGoal = loadUserData.dailyExerciseGoal;
    console.log(this.UserName + ' ' + this.dailyWaterIntakeGoal);

  }
  else console.log('error trying to get current user from storage');
// check the date - if current date (not time) is same as stored in currentUser local Storage
// then initialize progress from local storage, otherwise set to zero.
  var today = new Date();
  today = Math.floor(today.valueOf() / 100000) * 100000;
  console.log('current date num; ' + today + ' loaded Date Num: ' + loadUserData.currentDateNumber);
  if ( today == loadUserData.currentDateNumber) {
    // We're on the same day
    conso
    console.log('same day');
    this.dailyWaterIntake = loadUserData.dailyWaterIntake;
    this.dailyProteinIntake = loadUserData.dailyProteinIntake;
    this.dailyExercise = loadUserData.dailyExerciseGoal;
  } else {
    console.log('new day');
    // today is a new day - set our daily progress to 0
    this.dailyWaterIntake = 0;
    this.dailyProteinIntake = 0;
    this.dailyExercise = 0;
  }
  this.currentDateNumber = today;
  this.currentDateNumber = new Date();

};

User.prototype.drinkWater = function(amount) {
};

User.prototype.eatProtein = function(amount) {
};

User.prototype.exercise = function(amount) {
};

User.prototype.writeUserInfoToLocalStorage = function() {

// update info in our OnTrack-currentUser so data is always persisted
  localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUserData));

};

User.prototype.writeUserDataToLocalStorage = function(){
// write data to a new key that includes username
// data is an array of array data. One element for each day
// each day looks like [daynumber, waterIntake, waterGoal, proteinIntake, proteinGoal, exercise, exerciseGoal]
// when we write the data, we read in the existing data, check the day number of the last element
// if it is the same as current date, we pop that off the end of the array, replace it with current and write the whole new array to storage
// if it is not the same (less than), we push our current user data to end and re-write array
// if it is less than, someone has changed the clock and we bail

};

User.prototype.updateLocalStorage = function() {
// update userInfo and userData to local storage
};


// one or more functions to get an array of chart data from the localStorage userData.
User.prototype.getChartData = function () {
};

User.prototype.makeCurrentFromData = function (name, water, protein, exercise) {
  this.userName = name;
  this.dailyWaterIntake = water;
  this.dailyProteinIntake = protein;
  this.dailyExercise = exercise;
  currentUserData = [name, water, protein, exercise];
  this.writeCurrentToStorage();
};

User.prototype.makeCurrentFromStorage = function (){
  if (localStorage.getItem('OnTrack-currentUser')) {
    currentUserData = JSON.parse(localStorage.getItem('OnTrack-currentUser'));
  }
  else console.log('error trying to get current user from storage');
};

User.prototype.writeCurrentToStorage = function (){
  localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUserData));
};

User.prototype.clearCurrentUserStorage = function () {
  if (localStorage.getItem('OnTrack-currentUser')) {
    localStorage.removeItem('OnTrack-currentUser');
  }
};


User.prototype.registerNewUser = function (){
  console.log('registering new user');
  this.userName = document.getElementById('nameInput').value;
  this.userEmail = document.getElementById('emailInput').value;
  this.dailyWaterIntakeGoal = document.getElementById('waterInput').value;
  this.dailyProteinIntakeGoal = document.getElementById('proteinInput').value;
  this.dailyExerciseGoal = document.getElementById('exerciseInput').value;
  console.log('Localstorage username: ' + JSON.parse(localStorage.getItem('OnTrack-currentUser')).userName + ' entered name: ' + this.userName);
  if (JSON.parse(localStorage.getItem('OnTrack-currentUser')).userName == this.userName) {
    console.log('Local Storage for OnTrack User ' + this.userName + ' Exists');
    DlgShow('Sorry ' + this.UserName + ', that name is already in use.', 'Do you want to login as <b>' + name + '<b> or change your user name?');
  
  } else {
    localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
    console.log('User: ' + this.UserName + ' water intake: ' + this.dailyWaterIntakeGoal + ' protein intake: ' + this.dailyProteinIntakeGoal + ' exercise: ' + this.dailyExerciseGoal);
    window.open('daily.html', '_self');
  }
};

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'register-button':
    console.log('register-button pressed');
    currentUser.registerNewUser();
    break;

  }
}

function toggleBodyClass(){
  var toggleEl = document.getElementById('body');
  toggleEl.classList.toggle('dialogIsOpen');
}

function DlgHide(dlgButton)
{
  // Display the result onscreen.
  console.log('dlg hide called with' + dlgButton);

  switch (dlgButton) {
  case 'Login':
    window.open('daily.html', '_self');

    break;
  case 'ChangeName':

    break;
  }
  // Hide the dialog box.
  toggleBodyClass();

}

function DlgShow(dlgHeading, dlgMessage)
{
  // Change the message.
  document.getElementById('modal-heading').innerHTML = dlgHeading;
  document.getElementById('modal-info').innerHTML = dlgMessage;

  // Display the dialog box.
  // var Dlg = document.getElementById('modal');
  // Dlg.style.visibility = 'visible';
  toggleBodyClass();
}

//document.getElementById('register-button').addEventListener('click', clickHandler, false);

document.getElementById('register-button').addEventListener('click', buttonHandler, false);

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
}
