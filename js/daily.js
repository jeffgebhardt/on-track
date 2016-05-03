//dayOneArray[water, protein, exercise]
// var dayOneArray = [0, 0, 0];
var water = document.getElementById('waterToPage');
var protein = document.getElementById('proteinToPage');

var currentUser = new User();

function handleWater(){
  water.textContent = null;
  currentUser.drinkWater();
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
  //console.log('Amount of protein consumed: ' + dayOneArray[1]);
  var p = document.createElement('p');
  protein.appendChild(p);
  p.textContent = currentUser.dailyProteinIntake + ' grams of protein consumed today.';
}

document.getElementById('waterButton').addEventListener('click', handleWater);
document.getElementById('proteinButton').addEventListener('click', handleProtein);

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
  currentUser.getUserDataFromStorage();
  currentUser.updateHTML();

} else {
  window.open('register.html', '_self');
}
