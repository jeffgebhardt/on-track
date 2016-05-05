//dayOneArray[water, protein, exercise]
// var dayOneArray = [0, 0, 0];
var water = document.getElementById('waterToPage');
var protein = document.getElementById('proteinToPage');
var exercise = document.getElementById('exerciseToPage');

var currentUser = new User();

function conditionalColors(chartName){
  if(chartName.datasets[0].bars[0].value < 100){
    chartName.datasets[0].bars[0].fillColor = '#f8f7b2';
    chartName.datasets[0].bars[0].strokeColor = '#d1cf11';
  } else if (chartName.datasets[0].bars[0].value > 100){
    chartName.datasets[0].bars[0].fillColor = '#d2a4a4';
    chartName.datasets[0].bars[0].strokeColor = '#b02e2e';
  } else{
    chartName.datasets[0].bars[0].fillColor = '#a4d2a6';
    chartName.datasets[0].bars[0].strokeColor = '#35a43a';
  }
}

function handleWater(){
  water.textContent = null;
  currentUser.drinkWater();
  waterChart.datasets[0].bars[0].value = (currentUser.dailyWaterIntake / currentUser.dailyWaterIntakeGoal) * 100;
  conditionalColors(waterChart);
  waterChart.update();
  //console.log('Cups of water consumed: ' + dayOneArray[0]);
  var p = document.createElement('p');
  water.appendChild(p);
  p.textContent = currentUser.dailyWaterIntake + ' glasses of water consumed today.';
}

function handleProtein(){
  protein.textContent = null;
  //  var proteinValue = parseInt(event.target.proteinInput.value);
  var proteinValue = parseInt(document.getElementById('proteinInput').value);
  currentUser.eatProtein(proteinValue);
  proteinChart.datasets[0].bars[0].value = (currentUser.dailyProteinIntake / currentUser.dailyProteinIntakeGoal) * 100;
  conditionalColors(proteinChart);
  proteinChart.update();
  //console.log('Amount of protein consumed: ' + dayOneArray[1]);
  var p = document.createElement('p');
  protein.appendChild(p);
  p.textContent = currentUser.dailyProteinIntake + ' grams of protein consumed today.';
}

function handleExercise(){
  exercise.textContent = null;
  //  var exerciseValue = parseInt(event.target.exerciseInput.value);
  var exerciseValue = parseInt(document.getElementById('exerciseInput').value);
  currentUser.doExercise(exerciseValue);
  exerciseChart.datasets[0].bars[0].value = (currentUser.dailyExercise / currentUser.dailyExerciseGoal) * 100;
  // exerciseChart.datasets[0].bars[0].value = ' ';
  conditionalColors(exerciseChart);
  exerciseChart.update();
  //console.log('Minutes of activity today: ' + dayOneArray[1]);
  var p = document.createElement('p');
  exercise.appendChild(p);
  p.textContent = currentUser.dailyExercise + ' minutes of activity today.';
}

function handleExerciseTwo(){
  exercise.textContent = null;
  //  var exerciseValue = parseInt(event.target.exerciseInput.value);
  var exerciseValue = parseInt(document.getElementById('exerciseInput').value);
  currentUser.doExercise(exerciseValue);
  // exerciseChart.datasets[0].bars[0].value = (currentUser.dailyExercise / currentUser.dailyExerciseGoal) * 100;
  exerciseChart.datasets[0].bars[0].value = ' ';
  conditionalColors(exerciseChart);
  exerciseChart.update();
  //console.log('Minutes of activity today: ' + dayOneArray[1]);
  var p = document.createElement('p');
  exercise.appendChild(p);
  p.textContent = currentUser.dailyExercise + ' minutes of activity today.';
}

User.prototype.drinkWater = function(amount) {
  this.dailyWaterIntake += 1;
  this.updateLocalStorage();

};

User.prototype.eatProtein = function(amount) {
  this.dailyProteinIntake += amount;
  this.updateLocalStorage();
};

User.prototype.doExercise = function(amount) {
  this.dailyExercise += amount;
  this.updateLocalStorage();
};

document.getElementById('waterButton').addEventListener('click', handleWater);
document.getElementById('proteinButton').addEventListener('click', handleProtein);
document.getElementById('exerciseButton').addEventListener('click', handleExercise);
document.getElementById('exerciseButton').addEventListener('contextmenu', handleExerciseTwo);

User.prototype.updateDailyHTML = function () {
  //localStorage
  // var retrievedData = localStorage.getItem('OnTrack-currentUser');
  // var currentUserTwo = JSON.parse(retrievedData);

  document.getElementById('waterFromStorage').innerHTML = 'Your water intake goal is: ' + this.dailyWaterIntakeGoal + ' cups.';
  document.getElementById('proteinFromStorage').innerHTML = 'Your protein intake goal is: ' + this.dailyProteinIntakeGoal + ' grams.';
  document.getElementById('exerciseFromStorage').innerHTML = 'Your exercise goal is ' + this.dailyExerciseGoal + ' minutes.';
  document.getElementById('helloMessage').innerHTML = 'Hello ' + this.userName + '.';
  console.log(this.userName);

  console.log(currentUser);
};

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

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
  currentUser.updateDailyHTML();

} else {
  window.open('register.html', '_self');
}
