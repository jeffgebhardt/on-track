
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
  this.userUID = '';
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
  console.log('getting user data from storage. Remote data = ' + useRemoteData);
  if (localStorage.getItem('OnTrack-currentUser')) {
    var loadUserInfo = JSON.parse(localStorage.getItem('OnTrack-currentUser'));
    this.userName = loadUserInfo.userName;
    this.userUID = loadUserInfo.userUID;
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
  console.log('before updating local storage' + currentUser.userName);

  currentUser.updateUserData();
  console.log('afte updating local storage' + currentUser.userName);
  localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));

  if (useRemoteData){
    var usersRef = myDataRef.child('users');
    console.log('trying to access remote user: ' + currentUser.userName + currentUser.userUID);
    var curUserRef = usersRef.child(currentUser.userUID);
    curUserRef.set( currentUser );
  }
};

// one or more functions to get an array of chart data from the localStorage userData.
User.prototype.getChartData = function () {
};

User.prototype.clearCurrentUserStorage = function () {
  console.log('clearing local storage');
  localStorage.removeItem('OnTrack-currentUser');
  localStorage.removeItem('OnTrack');
  localStorage.removeItem('OnTrack-SignedIn');
};

User.prototype.userSignedIn = function(){
  localStorage.setItem('OnTrack-SignedIn', true);
};

User.prototype.userSignedOut = function(){
  localStorage.removeItem('OnTrack-SignedIn');
  User.prototype.clearCurrentUserStorage();
  window.open('index.html', '_self');
};

User.prototype.usedMachine = function(){
  localStorage.setItem('OnTrack', true);
};

User.prototype.newMachine = function(){
  localStorage.removeItem('OnTrack');
};

User.prototype.signinRemoteUser = function (userObject){
  console.log('user object ' + userObject);
  this.clearCurrentUserStorage();
  var loadUserInfo = null;
  console.log('signing in remote user: ' + userObject.userName);
  currentUser.userName = userObject.userName;
  currentUser.userEmail = userObject.userEmail;
  currentUser.dailyWaterIntakeGoal = userObject.dailyWaterIntakeGoal;
  currentUser.dailyProteinIntakeGoal = parseInt(userObject.dailyProteinIntakeGoal);
  currentUser.dailyExerciseGoal = parseInt(userObject.dailyExerciseGoal);
  var today = getDateNumFromDate(new Date());

  if ( today === userObject.currentDateNumber) {
      // We're on the same day
    console.log('same day');
    currentUser.dailyWaterIntake = parseInt(userObject.dailyWaterIntake);
    currentUser.dailyProteinIntake = parseInt(userObject.dailyProteinIntake);
    currentUser.dailyExercise = parseInt(userObject.dailyExercise);
  } else {
    console.log('new day');
    // today is a new day - set our daily progress to 0
    currentUser.dailyWaterIntake = 0;
    currentUser.dailyProteinIntake = 0;
    currentUser.dailyExercise = 0;
  }
  currentUser.currentDateNumber = today;
  currentUser.currentDate = new Date();
  if (userObject.userData ) {
    currentUser.userData = userObject.userData;
    console.log(userObject.userData);
    console.log(currentUser.userName + ' ' + currentUser.userData);
  }
  currentUser.updateLocalStorage();
  currentUser.userSignedIn();
  window.open('daily.html', '_self');

};

User.prototype.registerNewUserRemote = function() {
  if (useRemoteData == true){
    var ref = new Firebase('https://luminous-torch-2017.firebaseio.com');
    ref.createUser({
      email    : document.getElementById('emailInput').value,
      password : document.getElementById('passwordInput').value
    }, function(error, userData) {
      if (error) {
        console.log('Error creating user:', error);
        alert('User with that email already exists - please log in ');
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
        console.log('new user');
        ref.authWithPassword({
          email    :  document.getElementById('emailInput').value,
          password : document.getElementById('passwordInput').value
        }, function(error, authData) {
          if (error) {
            console.log('Login Failed!', error);
          } else {
            console.log('Authenticated successfully with payload:', authData.uid);
            currentUser.userUID = authData.uid;
            console.log(currentUser.userUID + ' ' + authData.uid);
            if (currentUser.userUID != currentUser.userName){
              console.log('registering new user remote ' + this.userName + ' ' + currentUser.userName + currentUser.userUID);
              var usersRef = myDataRef.child('users');
              var curUserRef = usersRef.child(currentUser.userUID);
              curUserRef.set( currentUser );
              localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
              currentUser.usedMachine();
              currentUser.userSignedIn();

              window.open('daily.html', '_self');
            }

          }
        });

      }
    });
  }
};

User.prototype.registerNewUser = function (){
  console.log('registering new user');
  this.userName = document.getElementById('nameInput').value;
  this.userUID = this.userName;
  this.userEmail = document.getElementById('emailInput').value;
  this.dailyWaterIntakeGoal = document.getElementById('waterInput').value;
  this.dailyProteinIntakeGoal = document.getElementById('proteinInput').value;
  this.dailyExerciseGoal = document.getElementById('exerciseInput').value;
  this.userData = [currentUserDataArray()];
  // console.log('Localstorage username: ' + JSON.parse(localStorage.getItem('OnTrack-currentUser')).userName + ' entered name: ' + this.userName);
  if (localStorage.getItem('OnTrack-currentUser')) {
    if (JSON.parse(localStorage.getItem('OnTrack-currentUser')).userName == this.userName) {
      // console.log('Local Storage for OnTrack User ' + this.userName + ' Exists');
      DlgShow('Sorry ' + this.userName + ', that name is already in use.', 'Do you want to login as <b>' + this.userName + '</b> or change your user name?');
    } else { // local storage does not match just entered userName
      if(useRemoteData){ this.registerNewUserRemote();} else {
        localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
        currentUser.usedMachine();
        currentUser.userSignedIn();
        // console.log('User: ' + this.UserName + ' water intake: ' + this.dailyWaterIntakeGoal + ' protein intake: ' + this.dailyProteinIntakeGoal + ' exercise: ' + this.dailyExerciseGoal);
        // window.open('daily.html', '_self');
      }

    }
  } else // no local storage
  {
    if(useRemoteData){
      this.registerNewUserRemote();
    } else {
      localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
      currentUser.usedMachine();
      currentUser.userSignedIn();

      window.open('daily.html', '_self');
    }
  }
};

function go() {
  var userId = prompt('Username?', 'Guest');
  checkIfUserExists(userId);
}

var USERS_LOCATION = 'https://luminous-torch-2017.firebaseio.com/users';

function userExistsCallback(userId, exists) {
  if (exists) {
    // alert('user ' + userId + ' exists');
    currentUser.signinRemoteUser(userId);
  } else {
    alert('user ' + userId + ' does not exist!');
    window.open('register.html', '_self');

  }
}

// Tests to see if /users/<userId> has any data.
function checkIfUserExists(userId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}

User.prototype.signinUser = function(name, password){
  // var usersRef = myDataRef.child('users');
  // var curUserRef = usersRef.child(this.userName);
  // curUserRef.set( currentUser );

  if (useRemoteData){
    console.log('attempting auth with: ' + name + password);
    var ref = new Firebase('https://luminous-torch-2017.firebaseio.com');
    ref.authWithPassword({
      email    :  name,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        currentUser.userUID = authData.uid;
        var usersRef = new Firebase(USERS_LOCATION);
        usersRef.child(currentUser.userUID).once('value', function(snapshot) {
          if (snapshot.val() !== null){
            currentUser.signinRemoteUser(snapshot.val());
          } else
          {
            window.open('register.html', '_self');
          }
        });

      }
    });

  } else {
    window.open('register.html', '_self');
// logic around here to deal with local storage 'sign in'
// if username input is same as current local storage, then use it, otherwise register.
  }

};

if (localStorage.getItem('OnTrack-Remote')) {
  useRemoteData = true;
}
