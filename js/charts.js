// var retrievedData = localStorage.getItem('OnTrack-currentUser');
// var currentUserTwo = JSON.parse(retrievedData);

var currentUserTwo = [3,90,5];
var currentUserData = [5,70,5];
// var userGreeting = document.getElementById('user-greeting');
// var firstName = currentUserTwo[0];
var waterLocation = document.getElementById('water-location');
var proteinLocation = document.getElementById('protein-location');
var exerciseLocation = document.getElementById('exercise-location');
// var initialPercentages = [
//   parseInt(currentUserTwo[2]),
//   parseInt(currentUserTwo[3]),
//   parseInt(currentUserTwo[4]),
// ];
var finishedPercentages = [];

var options = {
  responsive: true,
  showScale: false,
  scaleOverride: true,
  scaleSteps: 6,
  scaleStepWidth: 20,
  scaleStartValue: 0
};

// (function greetUser(){
//   var h5 = document.createElement('h5');
//   h5.textContent = 'Hi ' + firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
//   userGreeting.appendChild(h5);
// })();

(function getPercentages (){
  for (i = 0; i < currentUserData.length; i++){
    finishedPercentages.push(Math.round((currentUserData[i] / currentUserTwo[i] * 100)));
  }
})();

//Charts

function showWaterChart(){
  waterLocation.innerHTML = '<canvas id="water-chart"></canvas>';
  var contextWater = document.getElementById('water-chart').getContext('2d');

  var todayWater = finishedPercentages[0];
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

  new Chart(contextWater).Bar(data, options);
}

function showProteinChart(){
  proteinLocation.innerHTML = '<canvas id="protein-chart"></canvas>';
  var contextProtein = document.getElementById('protein-chart').getContext('2d');

  var todayProtein = finishedPercentages[1];
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

  var proteinChart = new Chart(contextProtein).Bar(data, options);
}

function showExerciseChart(){
  exerciseLocation.innerHTML = '<canvas id="exercise-chart"></canvas>';
  var contextExercise = document.getElementById('exercise-chart').getContext('2d');

  var todayExercise = finishedPercentages[2];
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

  var exerciseChart = new Chart(contextExercise).Bar(data, options);
}

showWaterChart();
showProteinChart();
showExerciseChart();
