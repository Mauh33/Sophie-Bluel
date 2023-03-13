


// Boutons à comparer aux catégories sur l'API
const CATEGORIES = {
  NONE: "Tous",
  OBJECTS: "Objets",
  APPARTMENTS: "Appartements",
  HOTELS: "Hotels & restaurants"
};


// 1) fonction de récupération des travaux sur le dom
async function getProjects() {
  const response = await fetch('http://localhost:5678/api/works')
    .catch((error) => console.error(error));
  const projects = await response.json();
  return projects
}


// 2) fonction de génération des projets triés
async function projectsGenerator() {

  //On attend la réponse, le resolve de la promesse de fetch.
  const projects = await getProjects();
  // Object.values permet de renvoyer un tableau
  // contenant les valeurs de l'objet passé en param
  const labels = Object.values(CATEGORIES);

  const portfolio = document.querySelector("#portfolio");
  const myGallery = document.querySelector(".gallery");
  const filtersElement = document.createElement("div");
  filtersElement.classList.add("filters_bloc");
  portfolio.appendChild(filtersElement);
  portfolio.insertBefore(filtersElement, myGallery);

  // Envoi des projets sur le dom afin de vérifier les catégories présentes
  displayProjects(projects)


  /* fonction qui prend par défaut aucune catégorie.
  Sinon on filtre dans un tableau, avec .filter()  */
  const getFilteredProjects = (category) => {
    return () => {
      // let est utilisé pour être réassigné afin qu'on puisse changer la catégorie
      let filteredProjects;
      if (category === CATEGORIES.NONE) {
        filteredProjects = projects;
      } else {
        /* on appelle une méthode filter, et une fonction callback qui va comparer le nom sur l'api et celui de l'objet créee */
        filteredProjects = projects.filter(projet => projet.category.name === category);
      }
      // Dans tous les cas, on rafraichit la galerie on effaçant ce qui était avant
      myGallery.innerHTML = "";
      // Et on inclut la génération visuelle au filtre choisi.
      displayProjects(filteredProjects);
    };
  };

  /*
  Pour toutes les catégories, on crée l'ensemble des éléments, on lui assigne sa catégorie
  */
  for (const label of labels) {
    const btnFilter = document.createElement("button");
    btnFilter.textContent = label;
    filtersElement.appendChild(btnFilter);
    btnFilter.addEventListener("click", getFilteredProjects(label));
  }


  // création des éléments des projets
  function displayProjects(projects) {
    for (const project of projects) {
      const projectElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = project.imageUrl;
      imageElement.crossOrigin = "anonymous";
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = project.title;
      myGallery.appendChild(projectElement);
      projectElement.appendChild(imageElement);
      projectElement.appendChild(figcaptionElement);
    }
  }
}

projectsGenerator();




// éléments à mettre en avant en mode édition
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const galleryEdit = document.querySelector(".gallery-edit");
const modalContainerAdd = document.querySelector(".modal-container-add")
const modalTriggersAdd = document.querySelectorAll(".modal-triggerAdd");

const inputFile = document.getElementById('image');
const imageContainer = document.querySelector('.add-picture-img');

const Bearer = window.sessionStorage.getItem("Bearer")



// 3) fonction d'ouverture des modales au clic de la souris
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
modalTriggersAdd.forEach(test => test.addEventListener("click", displaySecondModal));


// 4) fonction d'affichage de la première modale et des img des projets en miniature
let imgDisplayed = [];

function toggleModal() {
  modalContainer.classList.toggle("active");
  // création des img de la modale
  async function displayModalImg() {
    const projectsImg = await getProjects();
    for (const project of projectsImg) {
      // si la var n'inclut pas les URL des img de l'api
      if (!imgDisplayed.includes(project.imageUrl)) {
        // élements crées
        const divElementProject = document.createElement("div");
        const imageElement = document.createElement("img");
        const divTrashElement = document.createElement("div");
        let trashElement = document.createElement("img");
        let trashBtn = document.createElement("button");
        // attributs des images
        imageElement.src = project.imageUrl;
        imageElement.crossOrigin = "anonymous";
        trashElement.src = "./assets/icons/trash-icon.svg";
        // classes ajoutées
        divElementProject.classList.add("divModalImg");
        divTrashElement.classList.add("divTrashImg");
        trashBtn.classList.add("trashBtn");
        trashElement.classList.add("trashImg");
        // lien entre les éléments et le dom
        galleryEdit.appendChild(divElementProject);
        divElementProject.appendChild(imageElement);
        divElementProject.appendChild(divTrashElement);
        divTrashElement.appendChild(trashBtn);
        trashBtn.appendChild(trashElement);

        imgDisplayed.push(imageElement.src);
        console.log(imageElement);
      }
    }
  }
  return displayModalImg();
}

/* function trashNumbering(divTrashElement) {
  let id = document.querySelectorAll(".divTrashImg").length + 1;
  const divNumbered = divTrashElement.querySelectorAll("divTrashImg");
  divNumbered.forEach((div) => {
    div.id = "0" + id;
    id++;
  });
} */

/* function incrementDivIds() {
  let id = 1;
  const divModalImg = document.querySelector("divModalImg");
  const divNumbered = divModalImg.querySelectorAll("div");
  for (let i = 0; i < divNumbered.length; i++) {
    divNumbered += id + 1;
    divNumbered[i].setAttribute("id", id);
    id++
  }
} */


/* function incrementDivTrashImgIds(trashBtn) {
  // Récupérer tous les éléments avec la classe "divTrashImg"
  const trashBtnVar = trashBtn;

  // Parcourir chaque élément et incrémenter son attribut "id"
  trashBtnVar.forEach((trashBtnVar) => {
    // Récupérer l'ancienne valeur de l'attribut "id"
    const oldId = trashBtnVar.setAttribute("id", " ");
    const Id = trashBtnVar.getAttribute('oldId');

    // Incrémenter l'ancienne valeur de 1
    const newId = parseInt(id) + 1;

    // Mettre à jour l'attribut "id" avec la nouvelle valeur
    trashBtnVar.setAttribute('id', newId.toString(1));
  });
} */


// 5) fonction d'affichage de la deuxième modale
function displaySecondModal() {
  modalContainer.classList.toggle("active");
  modalContainerAdd.classList.toggle("active");
  if (inputFile.files[0]) {
    imageContainer.src = "./assets/icons/pictures-addpictures-project.svg";
    imageContainer.setAttribute("class", "add-picture-img");
  }
  // modalContainerAdd.style.display = "block"
}


// 6) Affichage de l'image nouvellement chargée
function displaySelectedImage() {

  const reader = new FileReader();
  imageContainer.classList.add('newImg');
  reader.addEventListener('load', function () {
    imageContainer.src = reader.result;
    const btnValidation = document.querySelector(".btn-validation");
    btnValidation.style.backgroundColor = "#1D6154";
  });
  if (inputFile.files[0]) {
    reader.readAsDataURL(inputFile.files[0]);
  }
}

const imageInput = document.getElementById('image');
imageInput.addEventListener('change', displaySelectedImage);



// 7) fonction d'envoi des nouveaux projets
const formModal = document.getElementById("formModal");

formModal.addEventListener("submit", async function (e) {

  e.preventDefault();

  const formData = new FormData(formModal)
  console.log(...formData)
  // const Bearer = window.sessionStorage.getItem("Bearer")

  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${Bearer}` },
    body: formData
  })
    .then(response => {
      const data = response.json();
      if (response.ok) {
        console.log(data);
        return data
      } else {
        throw { "name": "ResponseNotOkError", "message": data["message"], "status": response.status };
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch(err => {
      if (err !== null) {
        Error(err.message, err.status); // custom function
      } else {
        TinyText.Create(err.message); // Showing error
      }
    })
});




// 8) Suppression de la modale

/*

trashBtn.addEventListener("click", async function (e) {
  e.preventDefault();


  const project = await getProjects();
  const id = await project.id;
  deleteProject(id)
})

async function deleteProject(id) {
  const deleteWork = await fetch(`http://localhost:5678/api/works/` + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${Bearer}`
    }
  })
    .then((response) => {
      const JSONresponse = response.json();
      console.log(JSONresponse)
    })
    .then(result => alert(result, "Votre projet a été supprimé"))
}
 */

/*

function deleteProject(id) {

  const deleteWork = await fetch(`http://localhost:5678/api/works/{id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${Bearer}` },
    body:
  })
}

trashElement.addEventListener("click", )
 */
