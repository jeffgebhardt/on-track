var retrievedData = localStorage.getItem('OnTrack-currentUser');
var currentUserTwo = JSON.parse(retrievedData);
var currentUserData = [2,70,3];
var userGreeting = document.getElementById('user-greeting');
var firstName = currentUserTwo[0];

var percentages = [
  parseInt(currentUserTwo[2]),
  parseInt(currentUserTwo[3]),
  parseInt(currentUserTwo[4]),
];

var finishedPercentages = [];

(function getPercentages (){
  for (i = 0; i < currentUserData.length; i++){
    finishedPercentages.push(currentUserData[i] / percentages[i]);
  }
})();

(function greetUser(){
  var h5 = document.createElement('h5');
  h5.textContent = 'Hi ' + firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
  userGreeting.appendChild(h5);
})();

var waterLocation = document.getElementById('water-location');
var proteinLocation = document.getElementById('protein-location');
var exerciseLocation = document.getElementById('exercise-location');

function handleWaterGraph(){
  waterLocation.innerHTML = '<canvas id="water-chart"></canvas>';
  var contextWater = document.getElementById('water-chart').getContext('2d');

  var data = {
    labels: ['', ''],
    datasets: [{
      label: 'You',
      fillColor: [ '#eef28c'],
      strokeColor: '#d8e01f',
      data: [currentUserData[0]]
    },
      {label: 'Goal',
      fillColor: [ '#b4d7df'],
      strokeColor: '#3aa7bf',
      boxWidth: 100,
      data: [currentUserTwo[2]]
    }]
  };

  var options = {
    responsive: true,
    showScale: false,
  };

  var waterChart = new Chart(contextWater).Bar(data, options);
}

function handleProteinGraph(){
  proteinLocation.innerHTML = '<canvas id="protein-chart"></canvas>';
  var contextProtein = document.getElementById('protein-chart').getContext('2d');

  var data = {
    labels: ['', ''],
    datasets: [{
      label: 'You',
      fillColor: [ '#dfb4b4'],
      strokeColor: '#bc4a4a',
      data: [currentUserData[1]]
    },
      {label: 'Goal',
      fillColor: [ '#b4d7df'],
      strokeColor: '#3aa7bf',
      boxWidth: 100,
      data: [currentUserTwo[3]]
    }]
  };

  var options = {
    responsive: true,
    showScale: false,
  };

  var proteinChart = new Chart(contextProtein).Bar(data, options);
}

function handleExerciseGraph(){
  exerciseLocation.innerHTML = '<canvas id="exercise-chart"></canvas>';
  var contextExercise = document.getElementById('exercise-chart').getContext('2d');
  var data;
  // var fillColor0 = data.datasets[0].fillColor;
  // var strokeColor0 = data.datasets[0].strokeColor;
  //
  // if (currentUserData[2] < currentUserTwo[4]){
  //   fillColor0 = '#c2f3c5';
  //   strokeColor0 = '#a4d2a6';
  // } else if(currentUserData[2] > currentUserTwo[4]){
  //   fillColor0 = '#dfb4b4';
  //   strokeColor0 = '#bc4a4a';
  // } else{
  //   fillColor0 = '#c2f3c5';
  //   strokeColor0 = '#a4d2a6';
  // }
  //
  // data = {
  //   labels: ['', ''],
  //   datasets: [{
  //     data: [currentUserData[2]]
  //   }],
  // };
//if-else not working, try in lower/higher numbers and it combines the two bars
  if (currentUserData[2] < currentUserTwo[4]){
    data = {
      labels: ['', ''],
      datasets: [{
        fillColor: [ '#c2f3c5'],
        strokeColor: '#a4d2a6',
        data: [currentUserData[2]]
      }],
    };
  } else if(currentUserData[2] > currentUserTwo[4]){
    data = {
      labels: ['', ''],
      datasets: [{
        fillColor: [ '#dfb4b4'],
        strokeColor: '#bc4a4a',
        data: [currentUserData[2]]
      },
    ]
    };
  } else{
    data = {
      labels: ['', ''],
      datasets: [{
        fillColor: [ '#c2f3c5'],
        strokeColor: '#a4d2a6',
        data: [currentUserData[2]]
      },
          {fillColor: [ '#b4d7df'],
          strokeColor: '#3aa7bf',
          boxWidth: 100,
          data: [currentUserTwo[4]]
        }]
    };
  }

  var options = {
    responsive: true,
    showScale: false,
  };

  var exerciseChart = new Chart(contextExercise).Bar(data, options);
}

handleWaterGraph();
handleProteinGraph();
handleExerciseGraph();
