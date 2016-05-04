var currentUser = new User();
var currentUserData = [5, 80, 5];
var currentUserTwo = [3,90,5];
var waterLocation = document.getElementById('water-location');
var proteinLocation = document.getElementById('protein-location');
var exerciseLocation = document.getElementById('exercise-location');
var waterChart;
var proteinChart;
var exerciseChart;

var options = {
  responsive: true,
  showScale: false,
  scaleOverride: true,
  scaleSteps: 6,
  scaleStepWidth: 20,
  scaleStartValue: 0
};

// var userGreeting = document.getElementById('user-greeting');
// var firstName = currentUserTwo[0];
// (function greetUser(){
//   var h5 = document.createElement('h5');
//   h5.textContent = 'Hi ' + firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
//   userGreeting.appendChild(h5);
// })();

//Charts

function showWaterChart(){
  waterLocation.innerHTML = '<canvas id="water-chart"></canvas>';
  var contextWater = document.getElementById('water-chart').getContext('2d');

  var todayWater = rightNowData[0];
  var conditionalFill;
  var conditionalStroke;
  if (todayWater < 100) {
    conditionalFill = '#f8f7b2';    //yellow
    conditionalStroke = '#d1cf11';
  } else if (todayWater > 100) {
    conditionalFill = '#d2a4a4';    //red
    conditionalStroke = '#b02e2e';
  } else{
    conditionalFill = '#a4d2a6';    //green
    conditionalStroke = '#35a43a';
  }

  var data = {
    labels: ['', ''],
    datasets: [{
      fillColor: conditionalFill,
      strokeColor: conditionalStroke,
      data: [todayWater]
    },
      {
        fillColor: '#b4d7df',
        strokeColor: '#3aa7bf',
        data: [100]
      }]
  };

  waterChart = new Chart(contextWater).Bar(data, options);
}

function showProteinChart(){
  proteinLocation.innerHTML = '<canvas id="protein-chart"></canvas>';
  var contextProtein = document.getElementById('protein-chart').getContext('2d');

  var todayProtein = rightNowData[1];
  var conditionalFill;
  var conditionalStroke;
  if (todayProtein < 100) {
    conditionalFill = '#f8f7b2';    //yellow
    conditionalStroke = '#d1cf11';
  } else if (todayProtein > 100) {
    conditionalFill = '#d2a4a4';    //red
    conditionalStroke = '#b02e2e';
  } else{
    conditionalFill = '#a4d2a6';    //green
    conditionalStroke = '#35a43a';
  }

  var data = {
    labels: ['', ''],
    datasets: [{
      fillColor: conditionalFill,
      strokeColor: conditionalStroke,
      data: [todayProtein]
    },
      {
        fillColor: '#b4d7df',
        strokeColor: '#3aa7bf',
        data: [100]
      }]
  };

  proteinChart = new Chart(contextProtein).Bar(data, options);
}

function showExerciseChart(){
  exerciseLocation.innerHTML = '<canvas id="exercise-chart"></canvas>';
  var contextExercise = document.getElementById('exercise-chart').getContext('2d');

  var todayExercise = rightNowData[2];
  var conditionalFill;
  var conditionalStroke;
  if (todayExercise < 100) {
    conditionalFill = '#f8f7b2';    //yellow
    conditionalStroke = '#d1cf11';
  } else if (todayExercise > 100) {
    conditionalFill = '#d2a4a4';    //red
    conditionalStroke = '#b02e2e';
  } else{
    conditionalFill = '#a4d2a6';    //green
    conditionalStroke = '#35a43a';
  }

  var data = {
    labels: ['', ''],
    datasets: [{
      fillColor: conditionalFill,
      strokeColor: conditionalStroke,
      data: [todayExercise]
    },
      {
        fillColor: '#b4d7df',
        strokeColor: '#3aa7bf',
        data: [100]
      }]
  };

  exerciseChart = new Chart(contextExercise).Bar(data, options);
}

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
} else {
  window.open('register.html', '_self');
}
var rightNowData = [(currentUser.dailyWaterIntake / currentUser.dailyWaterIntakeGoal) * 100,
    (currentUser.dailyProteinIntake / currentUser.dailyProteinIntakeGoal) * 100,
    (currentUser.dailyExercise / currentUser.dailyExerciseGoal) * 100];

showWaterChart();
showProteinChart();
showExerciseChart();
