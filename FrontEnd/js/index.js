//

const CATEGORIES = {
  NONE : "Tous",
  OBJECTS : "Objets",
  APPARTMENTS : "Appartements",
  HOTELS : "Hotels & restaurants"
};


// fonction de récupération des données sur le dom
async function getProjects() {
  const response = await fetch('http://localhost:5678/api/works')
  .catch((error) => console.error(error));
  const projects = await response.json()
  return projects;
}



// fonction de génération des projets triés
async function projectsGenerator(){

  //On attend la réponse, le resolve de la promesse de fetch.
  const projects = await getProjects();
  // Object.values permet de renvoyer un tableau
  // contenant les valeurs de l'objet passé en param
  const labels = Object.values(CATEGORIES);

  const portfolio = document.getElementById("portfolio");
  const myGallery = document.querySelector(".gallery");
  const titlePortfolio = document.querySelector("#portfolio h2");
  portfolio.prepend(titlePortfolio);
  const filtersElement = document.createElement("div");
  filtersElement.classList.add("filters_bloc");
  portfolio.appendChild(filtersElement);
  portfolio.insertBefore(filtersElement, myGallery);


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
      // Et on inclut la génération visuelle à au filtre choisi.
      displayProjects(filteredProjects);
    };
  };

  /*
  Pour toutes les catégories, on crée l'ensemble des éléments, on lui assigne
  sa catégorie
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
