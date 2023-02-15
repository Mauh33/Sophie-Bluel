
let emailElement = document.getElementById('email');
let passwordElement = document.getElementById('password');

form.onsubmit = login;


async function getUsersLogin(url= '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  const usersLogin = response.json()
  return usersLogin;
};


async function login(event) {
  event.preventDefault();
  let data = {
    email: form.elements['email'].value,
    password: form.elements['password'].value,
  };

  if ( data.email.value == "sophie.bluel@test.tld" && data.password.value == "S0phie") {
    try {
      console.log(data)
      // recevoir le token, et l'userID
    }
    catch (error) {
      console.log(error.message);
      throw error.error;
    }
  } else {
    alert( "Oups! veuillez entrer un email et/ou mot de passe valide")
  };


  getUsersLogin('http://localhost:5678/api/users/login', data)
  .then(data => {
    if (data.success) {
      window.location.assign('../index.html')
      alert("Login successfully")
      return data;
    }
    else {
      alert( "Oups! veuillez entrer un email et/ou mot de passe valide")
    }
  });
}




login();















// async function getUsersLogin(data) {

//   const form = document.getElementById('form');

//   form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const data = {
//       email: event.target.querySelector("[name=email]").value,
//       password: event.target.querySelector("[name=password").value
//     };
//     let chargeUtile = JSON.stringify(data);

//     const response = await fetch("http://localhost:5678/api/users/login", {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: chargeUtile,
//     });
//   });
//   let json = await response.json();

//   if (json.error) throw json.error;
//   this.message = json.message;
// }


// getUsersLogin(data);



