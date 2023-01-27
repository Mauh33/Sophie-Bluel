

// fonction asynchrone qui récupère les données

function getDataForDom() {

  const projectsUrl = fetch('http://localhost:5678/api/works');
  projectsUrl
    .then((projectsUrl) => {
      if(projectsUrl.ok){
        return projectsUrl.json();
      } else {
        console.error("Erreur réponse :" + projectsUrl.status);
      }
    })
    .then(jsonListData => {
      projectsGenerator(jsonListData);
    })
    .catch((error) => console.error(error));
  }

  getDataForDom();


  function projectsGenerator(jsonListData){

    const myGallery = document.querySelector(".gallery");

    for (let i = 0; i < jsonListData.length; i++) {

    const jsonListArticle = jsonListData[i];

    // figure qui recevront les balises img et figcaption
    const projectElement = document.createElement("figure");

    //création des balises et ajout des données

    const imageElement = document.createElement("img");
    imageElement.src = jsonListArticle.imageUrl;
    imageElement.crossOrigin = "anonymous";
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = jsonListArticle.title;

    // rattachement des balises au Dom
    myGallery.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(figcaptionElement);
        console.log(imageElement);
      }
    };












/*   async function getDataForDom() {
    const response = await fetch('http://localhost:5678/api/works');
    const jsonListData = await response.json();
    return jsonListData;
  }



     // Fonction de génération de projets

function projectsGenerator(jsonListData){

    const myGallery = document.querySelector(".gallery");

    for (let i = 0; i < jsonListData.length; i++) {

    const jsonListArticle = jsonListData[i];

    // figure qui recevront les balises img et figcaption
    const projectElement = document.createElement("figure");

    //création des balises et ajout des données

    const imageElement = document.createElement("img");
    imageElement.src = jsonListArticle.imageUrl;
    imageElement.crossOrigin = "anonymous";
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = jsonListArticle.title;

    // rattachement des balises au Dom
    myGallery.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(figcaptionElement);
        console.log(imageElement);
      }
    };
 */


