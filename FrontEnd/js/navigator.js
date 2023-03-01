import { hasValidateToken } from "./hasValidateToken.js";



const navigator = (data) => {
  const windowLocation = window.location;
  const canNavigate = hasValidateToken(data);
  if (canNavigate) {
    sessionStorage.setItem("Bearer", data.token);
    windowLocation.replace("http://127.0.0.1:5500/FrontEnd/index.html");
  }
};

export {navigator}




