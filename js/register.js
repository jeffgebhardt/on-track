var registeredUsers = [];
var currentUserInfo = [];
var currentUserData = [];

var myUserList = new UserList();

function populateUserList(currentValue, index, array){
  registeredUsers.push(currentValue);
}

function User(){
  this.userName = '';
  this.dailyWaterIntake = '';
  this.dailyProteinIntake = '';
  this.dailyExercise = '';
}

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

function UserList(userList) {
  if (userList) {
    if (userList.length === 0 )
    { console.log('no user list passed in');
    }
    else {
      userList.forEach(populateUserList);
    }
  }
}

UserList.prototype.registerNewUser = function (){
  console.log('registering new user');
  var name = document.getElementById('nameInput').value;
  var email = document.getElementById('emailInput').value;
  var waterIntake = document.getElementById('waterInput').value;
  var proteinIntake = document.getElementById('proteinInput').value;
  var exerciseActivity = document.getElementById('exerciseInput').value;
  if (localStorage.getItem('OnTrack-currentUser')) {
    console.log('Local Storage for OnTrack User ' + name + ' Exists');
  } else {
    localStorage.setItem('OnTrack-currentUser',JSON.stringify([name,email,waterIntake,proteinIntake,exerciseActivity]));
  }
  console.log('User: ' + name + ' water intake: ' + waterIntake + ' protein intake: ' + proteinIntake + ' exercise: ' + exerciseActivity);
  window.open('daily.html', '_self');

};

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'register-button':
    console.log('register-button pressed');
    myUserList.registerNewUser();
    break;

  }
}
function DlgHide(Result)
{
  // Display the result onscreen.
  var Output = document.getElementById("Result");
  Output.innerHTML = "You clicked: " + Result;

  // Hide the dialog box.
  var Dlg = document.getElementById("Overlay");
  Dlg.style.visibility = "hidden";
}
function DlgShow(Message)
{
  // Change the message.
  var Msg = document.getElementById("DlgContent");
  Msg.innerHTML = Message;

  // Display the dialog box.
  var Dlg = document.getElementById("Overlay");
  Dlg.style.visibility = "visible";
}


//document.getElementById('register-button').addEventListener('click', clickHandler, false);

document.getElementById('register-button').addEventListener('click', buttonHandler, false);

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
}
