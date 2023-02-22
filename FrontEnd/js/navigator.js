import { hasValidateToken } from "./hasValidateToken.js";

const navigator = (data) => {
  const windowLocation = window.location;
  const canNavigate = hasValidateToken(data);
  if (canNavigate) {
    localStorage.setItem("token", data.token)
    windowLocation.assign("http://127.0.0.1:5500/FrontEnd/index.html")
  } else {
    window.alert("Veuillez vérifier vos identifiants")
  }
};

export {navigator}
