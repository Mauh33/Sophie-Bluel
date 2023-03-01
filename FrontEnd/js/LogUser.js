import { navigator } from "./navigator.js";
import {loadedContent} from "./modalOpening.js"

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
  .then((response) => {
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
    })
  .then((data) => {
    console.log(data)
    // vérification du token, et démarrage de la session
    navigator(data),
    // affichage de la bannière éditeur
    loadedContent(data)
  })
  .catch((error) => {
    console.log("My error :", error.message);
    alert("Erreur dans l'identifiant ou le mot de passe");
  })
});



