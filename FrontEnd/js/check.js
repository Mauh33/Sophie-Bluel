document.addEventListener("DOMContentLoaded", async () => {

  let users = [];

  try {
    users = await nomDeLaFonction();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }

  console.log(users);
});




/* async function projectsGenerator() {

  const reponse = await fetch ('http://localhost:5678/api/works');
  const jsonList = await reponse.json();

  const myGallery = document.querySelector(".gallery");


  for (let i = 0; i < jsonList.length; i++) {

  const jsonListArticle = jsonList[i];

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

projectsGenerator(); */

