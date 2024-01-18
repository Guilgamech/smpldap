import Configuration from "../../utils/configuration";

//export const API = "http://localhost:3000/api/"
export const API = Configuration.value("apiUrl");
export const API_LOGIN = API + "login";
export const API_LOGOUT = API + "logout";
export const API_USER_ADD = API + "add";
export const API_USER_UPDATE = API + "update";
export const API_USER_FORM = API + "user-form";
export const API_SEARCH = API + "find";
export const API_OU = API + "ou";
export const API_CARRER = "";
export const API_DELETE_USER = API + "delete";
