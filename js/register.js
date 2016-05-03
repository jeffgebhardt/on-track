var currentUser = new User();

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'register-button':
    console.log('register-button pressed');
    currentUser.registerNewUser();
    break;

  }
}

function toggleBodyClass(){
  var toggleEl = document.getElementById('body');
  toggleEl.classList.toggle('dialogIsOpen');
}

function DlgHide(dlgButton)
{
  // Display the result onscreen.
  console.log('dlg hide called with' + dlgButton);

  switch (dlgButton) {
  case 'Login':
    window.open('daily.html', '_self');

    break;
  case 'ChangeName':

    break;
  }
  // Hide the dialog box.
  toggleBodyClass();

}

function DlgShow(dlgHeading, dlgMessage)
{
  // Change the message.
  document.getElementById('modal-heading').innerHTML = dlgHeading;
  document.getElementById('modal-info').innerHTML = dlgMessage;

  // Display the dialog box.
  // var Dlg = document.getElementById('modal');
  // Dlg.style.visibility = 'visible';
  toggleBodyClass();
}

//document.getElementById('register-button').addEventListener('click', clickHandler, false);

document.getElementById('register-button').addEventListener('click', buttonHandler, false);

if (localStorage.getItem('OnTrack-currentUser')){
  console.log('Local Storage Exists');
}
