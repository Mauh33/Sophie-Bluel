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



