
const loadedContent = (data) => {
  if (sessionStorage.getItem('Bearer', data.token)) {
    const event = new Event('eventLoad');
    document.addEventListener('eventLoad', () => {
      const modalEditBanner = document.getElementById("edit-bann");
      modalEditBanner.style.display = "block";
      console.log(event);
      const logOut = document.querySelector(".logOut");
      logOut.textContent = "logout";
      const editVisibilityOne = document.getElementById("hidden-edit-one");
      const editVisibilityTwo = document.getElementById("hidden-edit-two");
      const editVisibilityThree = document.getElementById("hidden-edit-three");
      editVisibilityOne.style.display = "inline-flex";
      editVisibilityTwo.style.display = "inline-flex";
      editVisibilityThree.style.display = "inline-flex";
      editVisibilityThree.style.marginLeft = "25px";
    })
    document.dispatchEvent(event)
  }
}
document.addEventListener('DOMContentLoaded', loadedContent);



export { loadedContent };
