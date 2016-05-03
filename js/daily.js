//dayOneArray[water, protein, exercise]
// var dayOneArray = [0, 0, 0];
var water = document.getElementById('waterToPage');
var protein = document.getElementById('proteinToPage');

var currentUser = new User();

function getDateNumFromDate(dateObject){
  console.log('date before: ' + dateObject.getTime());
  dateObject.setMilliseconds(0); dateObject.setSeconds(0); dateObject.setMinutes(0); dateObject.setHours(0);
  console.log('date after' + dateObject.getTime());
  return dateObject.getTime();
};

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
  var test = getDateNumFromDate(new Date());
  this.currentDateNumber = test;

  console.log('creating User ' + this.currentDate.valueOf() + ' ' + this.currentDateNumber);
}

User.prototype.getUserDataFromStorage = function() {
//  initialize user name and goals
  console.log('getUserDataFromStorage');
  var loadUserData = JSON.parse(localStorage.getItem('OnTrack-currentUser'));

  if (loadUserData) {

    this.userName = loadUserData.userName;
    this.userEmail = loadUserData.userEmail;

    this.dailyWaterIntakeGoal = loadUserData.dailyWaterIntakeGoal;
    this.dailyProteinIntakeGoal = loadUserData.dailyProteinIntakeGoal;
    this.dailyExerciseGoal = loadUserData.dailyExerciseGoal;
    console.log(this.userName + ' ' + this.dailyWaterIntakeGoal);
    console.log('loaded date number' + loadUserData.currentDateNumber);

  }
  else console.log('error trying to get current user from storage');
  // check the date - if current date (not time) is same as stored in currentUser local Storage
  // then initialize progress from local storage, otherwise set to zero.
  var today = new Date();
  todayNumber = getDateNumFromDate(today);
  console.log('current date num; ' + today + ' loaded Date Num: ' + loadUserData.currentDateNumber);
  if ( todayNumber == loadUserData.currentDateNumber) {
   // We're on the same day
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
  this.dailyWaterIntake += 1;
};

User.prototype.eatProtein = function(amount) {
  this.dailyProteinIntake += amount;
};

User.prototype.exercise = function(amount) {
};

User.prototype.writeUserInfoToLocalStorage = function() {

// update info in our OnTrack-currentUser so data is always persisted
  localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUserData));
};

User.prototype.updateHTML = function () {
//localStorage
// var retrievedData = localStorage.getItem('OnTrack-currentUser');
// var currentUserTwo = JSON.parse(retrievedData);

  document.getElementById('waterFromStorage').innerHTML = 'Your water intake goal is: ' + this.dailyWaterIntakeGoal + '.';
  document.getElementById('proteinFromStorage').innerHTML = 'Your protein intake goal is: ' + this.dailyProteinIntakeGoal + '.';
  document.getElementById('exerciseFromStorage').innerHTML = 'Your exercise goal is ' + this.dailyExerciseGoal + ' per day.';
  document.getElementById('helloMessage').innerHTML = 'Hello ' + this.userName + '.';
  console.log(this.userName);

  console.log(currentUser);
};

function handleWater(){
  water.textContent = null;
  currentUser.drinkWater();
  //console.log('Cups of water consumed: ' + dayOneArray[0]);
  var p = document.createElement('p');
  water.appendChild(p);
  p.textContent = currentUser.dailyWaterIntake + ' glasses of water consumed today.';
}

function handleProtein(){
  protein.textContent = null;
  //  var proteinValue = parseInt(event.target.proteinInput.value);
  var proteinValue = parseInt(document.getElementById('proteinInput').value);
  currentUser.eatProtein(proteinValue);
  //console.log('Amount of protein consumed: ' + dayOneArray[1]);
  var p = document.createElement('p');
  protein.appendChild(p);
  p.textContent = currentUser.dailyProteinIntake + ' grams of protein consumed today.';
}

document.getElementById('waterButton').addEventListener('click', handleWater);
document.getElementById('proteinButton').addEventListener('click', handleProtein);

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
  currentUser.updateHTML();

} else {
  window.open('register.html', '_self');
}
