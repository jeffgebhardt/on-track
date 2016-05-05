User.prototype.registerNewUser = function (){
  console.log('registering new user');
  var ref = new Firebase("https://luminous-torch-2017.firebaseio.com");
  ref.createUser({
    email    : document.getElementById('emailInput').value,
    password : document.getElementById('passwordInput').value
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
  this.userName = document.getElementById('nameInput').value;
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
      console.log('new user');
      ref.authWithPassword({
        email    :  document.getElementById('emailInput').value,
        password : document.getElementById('passwordInput').value
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          currentUser.userUID = authData.uid;
        }
      });
      this.registerNewUserRemote();
      localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
      currentUser.usedMachine();
      currentUser.userSignedIn();

      // console.log('User: ' + this.UserName + ' water intake: ' + this.dailyWaterIntakeGoal + ' protein intake: ' + this.dailyProteinIntakeGoal + ' exercise: ' + this.dailyExerciseGoal);
      window.open('daily.html', '_self');
    }
  } else // no local storage
  {
    ref.authWithPassword({
      email    :  document.getElementById('emailInput').value,
      password : document.getElementById('passwordInput').value
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        currentUser.userUID = authData.uid;

      }
    });
    this.registerNewUserRemote();
    localStorage.setItem('OnTrack-currentUser',JSON.stringify(currentUser));
    currentUser.usedMachine();
    currentUser.userSignedIn();

    // window.open('daily.html', '_self');
  }
};
