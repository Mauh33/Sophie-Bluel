const form = document.getElementById('form');
const mail = document.getElementById('email').value;
const password = document.getElementById('password').value;


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
.then(data => console.log(data))
.catch(error => console.error(error));
});


