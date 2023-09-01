
const portfolioTitleBlock = document.createElement("div");
const myGallery = document.querySelector(".gallery");
const Bearer = window.sessionStorage.getItem("Bearer");


const CATEGORIES = {
  NONE: "Tous",
  OBJECTS: "Objets",
  APPARTMENTS: "Appartements",
  HOTELS: "Hotels & restaurants"
};


async function getProjects() {
  const response = await fetch('http://localhost:5678/api/works')
    .catch((error) => console.error(error));
  const projects = await response.json();
  return projects
}


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
  if (sessionStorage.getItem("Bearer") !== null) {
    filtersElement.style.display = "none";
  }

  displayProjects(projects)

  const getFilteredProjects = (category) => {
    return () => {
      let filteredProjects;
      if (category === CATEGORIES.NONE) {
        filteredProjects = projects;
      } else {
        filteredProjects = projects.filter(projet => projet.category.name === category);
      }
      myGallery.innerHTML = "";
      displayProjects(filteredProjects);
    };
  };

  for (const label of labels) {
    const btnFilter = document.createElement("button");
    btnFilter.textContent = label;
    filtersElement.appendChild(btnFilter);
    btnFilter.addEventListener("click", getFilteredProjects(label));
  }

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

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
modalTriggersAdd.forEach(test => test.addEventListener("click", displaySecondModal));

let imgDisplayed = [];

function toggleModal() {
  modalContainer.classList.toggle("active");
  async function displayModalImg() {
    let projectsImg = await getProjects();
    for (const project of projectsImg) {
      if (!imgDisplayed.includes(project.imageUrl)) {
        const divElementProject = document.createElement("div");
        const imageElement = document.createElement("img");
        const trashElement = document.createElement("img");
        const trashBtn = document.createElement("button");
        imageElement.src = project.imageUrl;
        imageElement.crossOrigin = "anonymous";
        trashElement.src = "./assets/icons/trash-icon.svg";
        trashBtn.setAttribute("type", "button");
        trashBtn.setAttribute("data-id", project.id)
        divElementProject.classList.add("divModalImg");
        imageElement.classList.add("imageElement");
        trashElement.classList.add("trashImg");
        trashBtn.classList.add("trashBtn");
        galleryEdit.appendChild(divElementProject);
        divElementProject.appendChild(imageElement);
        divElementProject.appendChild(trashBtn);
        divElementProject.appendChild(trashElement);
        imgDisplayed.push(imageElement.src);
        console.log(imageElement);

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

function displaySecondModal(e) {
  returnBtn.addEventListener("click", () => { modalContainer.classList.toggle("active") });
  modalContainer.classList.remove("active");
  modalContainerAdd.classList.toggle("active");
  if (inputFile.files[0]) {
    imageContainer.src = "./assets/icons/pictures-addpictures-project.svg";
    imageContainer.setAttribute("class", "add-picture-img");
  }
}

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



logOut.addEventListener("click", function (e) {
  e.preventDefault;
  sessionStorage.clear();
  console.log(sessionStorage.key);
})
