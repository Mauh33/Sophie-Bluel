
// Element div, regroupant le titre et les éléments du mode édition cliquable;
const portfolioTitleBlock = document.createElement("div");
const myGallery = document.querySelector(".gallery");
const Bearer = window.sessionStorage.getItem("Bearer");


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

  myGallery.innerHTML = " ";
  if (document.querySelector(".filters_bloc")) {
    document.querySelector(".filters_bloc").remove();
  }
  if (document.querySelector("portfolio-title-block")) {
    document.querySelector("portfolio-title-block").remove()
  }

  //On attend la réponse, le resolve de la promesse de fetch.
  const projects = await getProjects();
  /* Object.values permet de renvoyer un tableau
  contenant les valeurs de l'objet passé en param */
  const labels = Object.values(CATEGORIES);

  // Eléments à styliser, à lier au dom
  const portfolio = document.querySelector("#portfolio");
  const title = document.querySelector(".project-title");
  const edit = document.getElementById("hidden-edit-three");
  let filtersElement = document.createElement("div");
  portfolioTitleBlock.classList.add("portfolio-title-block");
  portfolioTitleBlock.style.margin = "100px 0 45px 0"
  filtersElement.classList.add("filters_bloc");
  portfolioTitleBlock.appendChild(title);
  portfolioTitleBlock.appendChild(edit);
  portfolio.appendChild(portfolioTitleBlock);
  portfolio.appendChild(filtersElement);
  portfolio.insertBefore(portfolioTitleBlock, myGallery)
  portfolio.insertBefore(filtersElement, myGallery);

  // condition d'apparition des filtres
  if (sessionStorage.getItem("Bearer") !== null) {
    filtersElement.style.display = "none";
  }

  // création des articles
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
        /* on appelle une méthode filter, et une fonction
        callback qui va comparer le nom sur l'api et celui de l'objet créee */
        filteredProjects = projects.filter(projet => projet.category.name === category);
      }
      // Dans tous les cas, on rafraichit la galerie en effaçant ce qui était avant
      myGallery.innerHTML = "";
      // Et on inclut la génération visuelle au filtre choisi.
      displayProjects(filteredProjects);
    };
  };

  /*
  Pour toutes les catégories, on crée l'ensemble des éléments,
  on lui assigne sa catégorie
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
const logOut = document.querySelector(".logOut");

const inputFile = document.getElementById('image');
const imageContainer = document.querySelector('.add-picture-img');
const trashBtn = document.querySelector("trashBtn");
const returnBtn = document.querySelector(".return-btn");
const btnValidation = document.getElementById("btn-validation");


// 3) fonction d'ouverture des modales au clic de la souris
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
modalTriggersAdd.forEach(test => test.addEventListener("click", displaySecondModal));


// 4) fonction d'affichage de la première modale et des img des projets en miniature
// + suppression des projets au clic sur le bouton corbeille
let imgDisplayed = [];

function toggleModal() {
  modalContainer.classList.toggle("active");
  // création des img de la modale
  async function displayModalImg() {
    let projectsImg = await getProjects();
    for (const project of projectsImg) {
      // si la var n'inclut pas les URL des img de l'api on l'ajoute
      // évite les duplicats
      if (!imgDisplayed.includes(project.imageUrl)) {
        // élements crées
        const divElementProject = document.createElement("div");
        const imageElement = document.createElement("img");
        const trashElement = document.createElement("img");
        const trashBtn = document.createElement("button");
        // attributs des images et btn
        imageElement.src = project.imageUrl;
        imageElement.crossOrigin = "anonymous";
        trashElement.src = "./assets/icons/trash-icon.svg";
        trashBtn.setAttribute("type", "button");
        trashBtn.setAttribute("data-id", project.id)
        // classes ajoutées
        divElementProject.classList.add("divModalImg");
        imageElement.classList.add("imageElement");
        trashElement.classList.add("trashImg");
        trashBtn.classList.add("trashBtn");
        // lien entre les éléments et le dom
        galleryEdit.appendChild(divElementProject);
        divElementProject.appendChild(imageElement);
        divElementProject.appendChild(trashBtn);
        divElementProject.appendChild(trashElement);
        imgDisplayed.push(imageElement.src);
        console.log(imageElement);


        // 5) fonction de suppression d'un projet
        trashBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const id = trashBtn.getAttribute("data-id");
          fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${Bearer}`
            }
          })
            .then((response) => {
              if (response.ok) {
                console.log("Le projet a bien été supprimé");
              }
            })
            .then((result) => {
              trashBtn.parentNode.remove();
              console.log(result);
              const lastArticle = myGallery.lastChild;
              console.log(lastArticle);
              lastArticle.remove();
            })
        })
      }
    }
    // élimination de l'image de positionnement
    if (document.querySelector(".moveImg")) {
      document.querySelector(".moveImg").remove()
    } else {
      const moveElement = document.createElement("img");
      moveElement.src = "./assets/icons/Move.svg";
      moveElement.classList.add("moveImg");
      galleryEdit.firstElementChild.appendChild(moveElement);
    }
  }
  return displayModalImg();
}


// 6) fonction d'affichage de la deuxième modale
function displaySecondModal(e) {
  returnBtn.addEventListener("click", () => { modalContainer.classList.toggle("active") });
  modalContainer.classList.remove("active");
  modalContainerAdd.classList.toggle("active");
  if (inputFile.files[0]) {
    imageContainer.src = "./assets/icons/pictures-addpictures-project.svg";
    imageContainer.setAttribute("class", "add-picture-img");
  }
}


// 7) Affichage de l'image nouvellement chargée dans la seconde modale
function displaySelectedImage() {
  const reader = new FileReader();
  imageContainer.classList.add('newImg');
  reader.addEventListener('load', function () {
    imageContainer.src = reader.result;
    btnValidation.style.backgroundColor = "#1D6154";
  });
  if (inputFile.files[0]) {
    reader.readAsDataURL(inputFile.files[0]);
  }
}

inputFile.addEventListener('change', displaySelectedImage);




// 8) fonction d'envoi des nouveaux projets

const formModal = document.querySelector("#formModal");

async function addNewProject(e) {
  e.preventDefault();

  const formData = new FormData(formModal);
  console.log(...formData);

  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${Bearer}` },
    body: formData
  })
    .then(response => {
      const data = response.json();
      if (response.ok) {
        console.log(data, "Votre projet a bien été ajouté");
        projectsGenerator();
      } else {
        throw { "name": "ResponseNotOkError", "message": data["message"], "status": response.status };
      }
    })
    .then((success) => {
      modalContainer.classList.remove("active");
      modalContainerAdd.classList.remove("active");
      document.querySelector(".add-picture-img").src = "./assets/icons/pictures-addpictures-project.svg";
      document.querySelector(".add-picture-img").classList.remove("newImg");
      formModal.querySelector("#title").innerText = "";
      formModal.querySelector("#category")[0];
      formModal.reset();
      console.log(success);
    })
    .catch((err) => {
      if (err !== null) {
        Error(err.message, err.status);
      }
    });
};

formModal.addEventListener("submit", addNewProject)




// 9) fonction de nettoyage du sessionStorage
logOut.addEventListener("click", function (e) {
  e.preventDefault;
  sessionStorage.clear();
  console.log(sessionStorage.key);
})
