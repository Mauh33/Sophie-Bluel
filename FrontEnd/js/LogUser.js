const form = document.getElementById('form');
const mail = document.getElementById('email').value;
const password = document.getElementById('password').value;


const hasValidateToken = (data) => data?.userId ? true : false;

const navigator = (data) => {
  const windowLocation = window.location;
  const canNavigate = hasValidateToken(data);
  if (canNavigate) {
    localStorage.setItem("token", data.token)
    windowLocation.assign("http://127.0.0.1:5500/FrontEnd/index.html")
  } else {
    window.alert("Veuillez vérifier vos identifiants")
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); // empêche le formulaire de se soumettre normalement
  let formData = new FormData(form);

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData)) // convertit FormData en objet JSON
    })
  .then(response => response.json())
  .then(data => navigator(data))
  .catch(error => console.error(error));
});




/* then(response => response.json(), {
  windowLocation.assign("http://127.0.0.1:5500/FrontEnd/index.html"),
}
) */

/*


} */
