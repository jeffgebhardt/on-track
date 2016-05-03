function getDateNumFromDate(dateObject){
  // console.log('date before: ' + dateObject.getTime());
  dateObject.setMilliseconds(0); dateObject.setSeconds(0); dateObject.setMinutes(0); dateObject.setHours(0);
  console.log('date after' + dateObject.getTime());
  return dateObject.valueOf();
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
  this.userData = [];

  console.log('creating User ' + this.currentDate.valueOf() + ' ' + this.currentDateNumber);
}

User.prototype.getUserDataFromStorage = function() {
//  initialize user name and goals
  console.log('getUserDataFromStorage');
  if (localStorage.getItem('OnTrack-currentUser')) {
    var loadUserInfo = JSON.parse(localStorage.getItem('OnTrack-currentUser'));

    this.userName = loadUserInfo.userName;
    this.userEmail = loadUserInfo.userEmail;

    this.dailyWaterIntakeGoal = loadUserInfo.dailyWaterIntakeGoal;
    this.dailyProteinIntakeGoal = loadUserInfo.dailyProteinIntakeGoal;
    this.dailyExerciseGoal = loadUserInfo.dailyExerciseGoal;
    console.log(this.UserName + ' ' + this.dailyWaterIntakeGoal);

  }
  else console.log('error trying to get current user from storage');

  // check the date - if current date (not time) is same as stored in currentUser local Storage
  // then initialize progress from local storage, otherwise set to zero.
  var todayDate = new Date();
  var today = getDateNumFromDate(todayDate);

  console.log('current date num; ' + today + ' loaded Date Num: ' + loadUserInfo.currentDateNumber);
  if ( today == loadUserInfo.currentDateNumber) {
    // We're on the same day
    console.log('same day');
    this.dailyWaterIntake = loadUserInfo.dailyWaterIntake;
    this.dailyProteinIntake = loadUserInfo.dailyProteinIntake;
    this.dailyExercise = loadUserInfo.dailyExerciseGoal;
  } else {
    console.log('new day');
    // today is a new day - set our daily progress to 0
    this.dailyWaterIntake = 0;
    this.dailyProteinIntake = 0;
    this.dailyExercise = 0;
  }
  this.currentDateNumber = today;
  this.currentDate = new Date();
  this.userData = loadUserInfo.userData;

};

User.prototype.drinkWater = function(amount) {
  this.dailyWaterIntake += 1;
  this.updateLocalStorage();

};

User.prototype.eatProtein = function(amount) {
  this.dailyProteinIntake += amount;
  this.updateLocalStorage();
};

User.prototype.exercise = function(amount) {
  this.updateLocalStorage();
};

function currentUserDataArray () {
  var myArray = [];

  myArray.push(currentUser.currentDateNumber);
  myArray.push(currentUser.userName);
  myArray.push(currentUser.userEmail);
  myArray.push(currentUser.dailyWaterIntakeGoal);
  myArray.push(currentUser.dailyWaterIntake);
  myArray.push(currentUser.dailyProteinIntakeGoal);
  myArray.push(currentUser.dailyProteinIntake);
  myArray.push(currentUser.dailyExerciseGoal);
  myArray.push(currentUser.dailyExercise);
  return myArray;
};

User.prototype.updateUserData = function(){
  // write data to a new key that includes username
  // data is an array of array data. One element for each day
  // each day looks like [daynumber, waterIntake, waterGoal, proteinIntake, proteinGoal, exercise, exerciseGoal]
  // when we write the data, we read in the existing data, check the day number of the last element
  // if it is the same as current date, we pop that off the end of the array, replace it with current and write the whole new array to storage
  // if it is not the same (less than), we push our current user data to end and re-write array
  // if it is less than, someone has changed the clock and we bail

  // var loadUserData = localStorage.getItem('OnTrack-currentUserData');
  var loadUserData = this.userData;
  if (loadUserData.length > 0 ) {
    console.log('we have some data already' + loadUserData);
    //we already have userData stored.

    var lastUserData = loadUserData[loadUserData.length - 1];
    if (lastUserData[0] === currentUser.currentDateNumber){
      console.log('we have a match');
      // we have a match - current date is same as last date stored.
      loadUserData.pop();
      loadUserData.push(currentUserDataArray());
    } else {
      // last data doesn't match, push new data.
      loadUserData.push(currentUserDataArray());
    }

    this.userData = loadUserData;
  } else {
    // no userData stored yet
    console.log('creating userDataArray');
    this.userData.push(currentUserDataArray());
  }

};

User.prototype.updateLocalStorage = function() {
// update userInfo and userData to local storage
  currentUser.updateUserData();
  localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));

};

// one or more functions to get an array of chart data from the localStorage userData.
User.prototype.getChartData = function () {
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
  // console.log('Localstorage username: ' + JSON.parse(localStorage.getItem('OnTrack-currentUser')).userName + ' entered name: ' + this.userName);
  if (localStorage.getItem('OnTrack-currentUser')) {
    if (JSON.parse(localStorage.getItem('OnTrack-currentUser')).userName == this.userName) {
      console.log('Local Storage for OnTrack User ' + this.userName + ' Exists');
      DlgShow('Sorry ' + this.UserName + ', that name is already in use.', 'Do you want to login as <b>' + name + '<b> or change your user name?');
    } else {
      localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
      console.log('User: ' + this.UserName + ' water intake: ' + this.dailyWaterIntakeGoal + ' protein intake: ' + this.dailyProteinIntakeGoal + ' exercise: ' + this.dailyExerciseGoal);
      window.open('daily.html', '_self');
    }
  } else {
    localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
    console.log('User: ' + this.UserName + ' water intake: ' + this.dailyWaterIntakeGoal + ' protein intake: ' + this.dailyProteinIntakeGoal + ' exercise: ' + this.dailyExerciseGoal);
    window.open('daily.html', '_self');
  }
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
