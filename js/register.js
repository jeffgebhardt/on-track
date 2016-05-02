var registeredUsers = [];

function populateUserList(currentValue, index, array){
  registeredUsers.push(currentValue);

}

function UserList(userList) {

  if (userList) {
    if (userList.length === 0 )
    { console.log('no user list passed in');
    }
    else {
      userList.forEach(populateUserList);
    }
  }

  function registerNewUser(){
    console.log('registering new user');
    if (localStorage.getItem('OnTrack-userList')){
      console.log('Local Storage for OnTrack User ListExists');

    }
  }
}

function buttonHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  switch (e.target.id) {
  case 'register-button':
    console.log('register-button pressed');
    registerNewUser();
    break;

  }
}

//document.getElementById('register-button').addEventListener('click', clickHandler, false);

document.getElementById('register-button').addEventListener('click', buttonHandler, false);

if (localStorage.getItem('productList')){
  console.log('Local Storage Exists');
}
