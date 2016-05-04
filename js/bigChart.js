//Local Storage
var currentUser = new User();
var bigChart;

// var helloMessage = document.getElementById('hello-message');
// helloMessage.innerHTML = currentUserTwo[0];

var bigChartLocation = document.getElementById('big-Chart-Location');

function getChartData () {
  console.log('Running getChartData');
  for (var i = 0; i < 5; i++) {
    console.log(currentUser.userData.length + 'Running' + i);
    dayWater.push((currentUser.userData[i][2] / currentUser.userData[i][1]) * 100);
  }
};


var lineChartGoal = [100, 100, 100, 100, 100];
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
      strokeColor: 'black',
      pointColor: 'black',
      data: lineChartGoal
    }, {
      label: 'Daily Water Intake',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'blue',
      pointColor: 'blue',
      data: dayWater
    }, {
      label: 'Daily Protein Intake',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'red',
      pointColor: 'red',
      data: dayProtein
    }, {
      label: 'Daily Exercise',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'green',
      pointColor: 'green',
      data: dayExercise
    }]
  };

  bigChart = new Chart(contextBigChart).Line(data, optionsBigChart);

  //document.getElementById('generate-legend').innerHTML = bigChart.generateLegend();
}

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();

} else {
  window.open('register.html', '_self');
}

currentUser.fakeLastNDays(5);

getChartData();
showBigChart();
