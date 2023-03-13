
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



export { loadedContent };
