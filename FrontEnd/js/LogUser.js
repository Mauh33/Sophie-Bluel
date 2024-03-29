import { navigator } from "./navigator.js";
import { loadedContent } from "./bann.js";


const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  let formData = new FormData(form);

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData)) 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      navigator(data),
        loadedContent(data);
    })
    .catch((error) => {
      console.log("My error :", error.message);
      alert("Erreur dans l'identifiant ou le mot de passe");
    })
});



