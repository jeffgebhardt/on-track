
var myDataRef = new Firebase('https://luminous-torch-2017.firebaseio.com/');
var useRemoteData = true;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getDateNumFromDate(dateObject){
  dateObject.setMilliseconds(0); dateObject.setSeconds(0); dateObject.setMinutes(0); dateObject.setHours(0);
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
  this.currentDateNumber = getDateNumFromDate(new Date());
  this.userData = [];

  // console.log('creating User ' + this.currentDate.valueOf() + ' ' + this.currentDateNumber);
}

User.prototype.getUserDataFromStorage = function() {
  if (localStorage.getItem('OnTrack-currentUser')) {
    var loadUserInfo = JSON.parse(localStorage.getItem('OnTrack-currentUser'));
    this.userName = loadUserInfo.userName;
    this.userEmail = loadUserInfo.userEmail;
    this.dailyWaterIntakeGoal = parseInt(loadUserInfo.dailyWaterIntakeGoal);
    this.dailyProteinIntakeGoal = parseInt(loadUserInfo.dailyProteinIntakeGoal);
    this.dailyExerciseGoal = parseInt(loadUserInfo.dailyExerciseGoal);
  }
  else console.log('error trying to get current user from storage');

  // check the date - if current date (not time) is same as stored in currentUser local Storage
  // then initialize progress from local storage, otherwise set to zero.
  var today = getDateNumFromDate(new Date());

  if ( today === loadUserInfo.currentDateNumber) {
    // We're on the same day
    console.log('same day');
    this.dailyWaterIntake = parseInt(loadUserInfo.dailyWaterIntake);
    this.dailyProteinIntake = parseInt(loadUserInfo.dailyProteinIntake);
    this.dailyExercise = parseInt(loadUserInfo.dailyExercise);
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

function currentUserDataArray () {
  var myArray = [];
  myArray.push(currentUser.currentDateNumber);
  myArray.push(currentUser.dailyWaterIntakeGoal);
  myArray.push(currentUser.dailyWaterIntake);
  myArray.push(currentUser.dailyProteinIntakeGoal);
  myArray.push(currentUser.dailyProteinIntake);
  myArray.push(currentUser.dailyExerciseGoal);
  myArray.push(currentUser.dailyExercise);
  return myArray;
};

User.prototype.updateUserData = function(){
  // data is an array of array data. One element for each day
  // each day looks like [daynumber, waterIntake, waterGoal, proteinIntake, proteinGoal, exercise, exerciseGoal]
  // when we write the data, we read in the existing data, check the day number of the last element
  // if it is the same as current date, we pop that off the end of the array, replace it with current and write the whole new array to storage
  // if it is not the same (less than), we push our current user data to end and re-write array
  // if it is less than, someone has changed the clock and we bail

  // var loadUserData = localStorage.getItem('OnTrack-currentUserData');
  var loadUserData = this.userData;
  if (loadUserData.length > 0 ) {
    //we already have userData stored.

    var lastUserData = loadUserData[loadUserData.length - 1];
    if (lastUserData[0] === currentUser.currentDateNumber){
      // console.log('we have a match');
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

User.prototype.fakeLastNDays = function(n){
  var today = new Date();
  var todayNumber = getDateNumFromDate(today);
  this.userData = [];
  for (i = 0; i < n - 1 ; i ++) {
    var myArray = [];
    var d = new Date(new Date().setDate(new Date().getDate() - i));
    // console.log(d.getDate() + ' ' + getDateNumFromDate(d));
    myArray.push(getDateNumFromDate(d));

    myArray.push(currentUser.dailyWaterIntakeGoal);
    myArray.push(getRandomInt(this.dailyWaterIntakeGoal * .3, this.dailyWaterIntakeGoal ));

    myArray.push(currentUser.dailyProteinIntakeGoal);
    myArray.push(getRandomInt(this.dailyProteinIntakeGoal * .25, this.dailyProteinIntakeGoal ));

    myArray.push(currentUser.dailyExerciseGoal);
    myArray.push(getRandomInt(this.dailyExerciseGoal * .25, this.dailyExerciseGoal ));

    this.userData.push(myArray);
    // this.userData;
  }

  this.userData.push(currentUserDataArray());
  this.updateLocalStorage();
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

User.prototype.registerNewUserRemote = function() {
  console.log('registering new user remote');
  var usersRef = myDataRef.child("users");
  usersRef.set( currentUser );

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
      // console.log('Local Storage for OnTrack User ' + this.userName + ' Exists');
      DlgShow('Sorry ' + this.userName + ', that name is already in use.', 'Do you want to login as <b>' + this.userName + '</b> or change your user name?');
    } else { // local storage does not match just entered userName
      this.registerNewUserRemote();
      localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
      // console.log('User: ' + this.UserName + ' water intake: ' + this.dailyWaterIntakeGoal + ' protein intake: ' + this.dailyProteinIntakeGoal + ' exercise: ' + this.dailyExerciseGoal);
      window.open('daily.html', '_self');
    }
  } else // no local storage
  {
    this.registerNewUserRemote();
    localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
    window.open('daily.html', '_self');
  }
};
