//dayOneArray[water, protein, exercise]
 var dayOneArray = [0, 0, 0];
 var water = document.getElementById('waterToPage');
 var protein = document.getElementById('proteinToPage');

 //localStorage
 var retrievedData = localStorage.getItem('OnTrack-currentUser');
 var currentUserTwo = JSON.parse(retrievedData);
 document.getElementById('waterFromStorage').innerHTML = 'Your water intake goal is: ' + currentUserTwo[2] + '.';
 document.getElementById('proteinFromStorage').innerHTML = 'Your protein intake goal is: ' + currentUserTwo[3] + '.';
 document.getElementById('exerciseFromStorage').innerHTML = 'Your exercise goal is ' + currentUserTwo[4] + ' per day.';
 document.getElementById('helloMessage').innerHTML = 'Hello ' + currentUserTwo[0] + '.';

 console.log(currentUserTwo);

 function handleWater(){
   water.textContent = null;
   dayOneArray[0] += 1;
   //console.log('Cups of water consumed: ' + dayOneArray[0]);
   var p = document.createElement('p');
   water.appendChild(p);
   p.textContent = dayOneArray[0] + ' glasses of water consumed today.';
 }

 function handleProtein(){
   protein.textContent = null;
  //  var proteinValue = parseInt(event.target.proteinInput.value);
   var proteinValue = parseInt(document.getElementById('proteinInput').value);
   dayOneArray[1] += proteinValue;
   //console.log('Amount of protein consumed: ' + dayOneArray[1]);
   var p = document.createElement('p');
   protein.appendChild(p);
   p.textContent = dayOneArray[1] + ' grams of protein consumed today.';
 }

 document.getElementById('waterButton').addEventListener('click', handleWater);
 document.getElementById('proteinButton').addEventListener('click', handleProtein);

 if (localStorage.getItem('OnTrack-currentUser')){
   console.log('Local Storage Exists');
 }
