var retrievedData = localStorage.getItem('OnTrack-currentUser');
var currentUserTwo = JSON.parse(retrievedData);
var helloMessage = document.getElementById('hello-message');
helloMessage.innerHTML = currentUserTwo[0];

var bigChartLocation = document.getElementById('big-Chart-Location');

var lineChartGoal = [100, 100, 100, 100, 100];
var dayWater = [68, 110, 100, 75, 130];
var dayProtein = [140, 93, 110, 80, 60];
var dayExercise = [105, 120, 45, 125, 60];

var optionsBigChart = {
  responsive: true,
  pointDotRadius: 10,
  bezierCurve: false,
  scaleShowVerticalLines: false,
  scaleGridLineColor: 'black'
};

//Big Charts
//----------

function showBigChart() {
  bigChartLocation.innerHTML = '<canvas id="big-Chart"></canvas>';
  var contextBigChart = document.getElementById('big-Chart').getContext('2d');

  var data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [{
      label: 'Daily Goal',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'black',
      pointColor: 'black',
      data: lineChartGoal
    }, {
      label: 'Daily Water Intake',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'rgba(0,0,0,0)',
      pointColor: 'blue',
      data: dayWater
    }, {
      label: 'Daily Protein Intake',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'rgba(0,0,0,0)',
      pointColor: 'red',
      data: dayProtein
    }, {
      label: 'Daily Exercise',
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: 'rgba(0,0,0,0)',
      pointColor: 'green',
      data: dayExercise
    }]
  };

  var bigChart = new Chart(contextBigChart).Line(data, optionsBigChart);

  document.getElementById('generate-legend').innerHTML = bigChart.generateLegend();
}

showBigChart();
