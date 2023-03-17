import {getProjects} from "./index.js"

// éléments à mettre en avant en mode édition
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalWrapper = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const buttonCloseModal = document.querySelector(".close-modal");
const galleryEdit = document.querySelector(".gallery-edit");
const buttonAddPicture = document.querySelector(".btn-edit");
const deleteElement = document.querySelector("delete-picture");



// fonction d'ouverture de la modale au clic de la souris
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

// 1) fonction d'affichage de la modale et des img des projets en miniature
let imgDisplayed = [];

function toggleModal(){
  modalContainer.classList.toggle("active");

  async function displayModalImg() {
  const projectsImg = await getProjects();
    for (const project of projectsImg) {
      // si la var n'inclut pas les URL des img de l'api
      if (!imgDisplayed.includes(project.imageUrl)) {
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.crossOrigin = "anonymous";
        galleryEdit.appendChild(imageElement);
        // imageElement.setAttribute('src', projectsImg.imageUrl)
        imgDisplayed.push(imageElement.src)
        console.log(imgDisplayed)
        // break
      }
    }
  }
  return displayModalImg();
}

/* buttonCloseModal.addEventListener('click', function() {
  e.preventDefault;
  imageElement.removeAttribute('src')
}) */

// !imgDisplayed.includes(Object.valueOf.length >= 13)

/*
function toggleModal(){
  modalContainer.classList.toggle("active");

  async function displayModalImg() {
  const projectsImg = await getProjects();
    for (const project of projectsImg) {
      console.log(project);
      const imageElement = document.createElement("img");
      imageElement.src = project.imageUrl;
      imageElement.crossOrigin = "anonymous";

      galleryEdit.appendChild(imageElement);
    }
  }
  return displayModalImg();
}
 */


// 2) fonction pour faire apparaître la bannière une fois la page chargée

const loadedContent = (data) => {
  if (sessionStorage.getItem('Bearer', data.token)) {
    const event = new Event('eventLoad');
    document.addEventListener('eventLoad', (e) => {
      const modalEditBanner = document.getElementById("edit-bann");
      modalEditBanner.style.display = "block";
      console.log(event);
    })
    document.dispatchEvent(event)
  }
}

document.addEventListener('DOMContentLoaded', loadedContent);



export {loadedContent}










// 3) permettre l'ajout de projet

/*
  Initialisation récupérateur d'url
*/
/*
function getImg() {

  // objet url auquel on ajoute la propriété search (après le ? dans la requête)
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');

  const matches = query.match(regex);


  // jeton json
  const jwt = sessionStorage.getItem("Bearer");
  const headers = {
    Authorization: `Bearer ${jwt}`

  };


// const BearerAuth = {http, Bearer}
//  headers: { Authorization: `Bearer ${token}` },

  async function loadImg(){

    for (const match of matches) {
      let response = await fetch("http://localhost:5678/api works/", {
        method: 'POST',
        {headers}
      })

      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur rencontrée avec l\'api')
        }
          return response.blob();
        })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const img = document.createElement('img');
          img.src = url;
          galleryEdit.appendChild(img)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}

  modalContainer.onload = loadImg;

 */









