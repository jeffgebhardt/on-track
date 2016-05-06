//Local Storage
var currentUser = new User();
var bigChart;

var bigChartLocation = document.getElementById('big-Chart-Location');

function getChartData () {
  console.log('Running getChartData');
  for (var i = 0; i < 5; i++) {
    //console.log(currentUser.userData.length + 'Running' + i);
    dayWater.push((currentUser.userData[i][2] / currentUser.userData[i][1]) * 100);
    dayProtein.push((currentUser.userData[i][4] / currentUser.userData[i][3]) * 100);
    dayExercise.push((currentUser.userData[i][6] / currentUser.userData[i][5]) * 100);
  }
};

var lineChartGoal = [100, 100, 100, 100, 100,];
var dayWater = [];
var dayProtein = [];
var dayExercise = [];

var optionsBigChart = {
  responsive: true,
  pointDotRadius: 10,
  bezierCurve: false,
  scaleShowVerticalLines: false,
  scaleGridLineColor: 'black'
};

function showBigChart() {
  bigChartLocation.innerHTML = '<canvas id="big-Chart"></canvas>';
  var contextBigChart = document.getElementById('big-Chart').getContext('2d');

  var data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [{
      label: 'Daily Goal',
      fillColor: 'rgba(100, 100, 100, 0.2)',
      strokeColor: '#2b2b2b',
      pointColor: '#2b2b2b',
      data: lineChartGoal
    }, {
      label: 'Daily Water Intake',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#3aa7bf',
      pointColor: '#3aa7bf',
      data: dayWater
    }, {
      label: 'Daily Protein Intake',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#b02e2e',
      pointColor: '#b02e2e',
      data: dayProtein
    }, {
      label: 'Daily Exercise',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#35a43a',
      pointColor: '#35a43a',
      data: dayExercise
    }]
  };

  bigChart = new Chart(contextBigChart).Line(data, optionsBigChart);

}

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();

} else {
  window.open('register.html', '_self');
}

var firstName = currentUser.userName;
function greetUser(){
  var capital = firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
  return capital;
};

document.getElementById('helloMessage').innerHTML = 'Hello ' + greetUser() + '.';

currentUser.fakeLastNDays(5);

getChartData();
showBigChart();

// var helloMessage = document.getElementById('hello-message');
// helloMessage.innerHTML = 'Hello ' + currentUser.userName + '.';

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'signout-button':
    currentUser.userSignedOut();
    break;

  }
}
document.getElementById('signout-button').addEventListener('click',buttonHandler, false);
