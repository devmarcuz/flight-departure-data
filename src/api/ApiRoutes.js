import axios from "axios";

// export const host = "https://flight-departure-auth-api.onrender.com";
export const host = "http://localhost:5000";
// export const host = "https://swift-chat-app-api.onrender.com";

export const addUserApi = `${host}/api/auth/add-user`;
export const loginUserApi = `${host}/api/auth/login-user`;

export const loadApiUsers = () => {
  axios
    .get(`${host}/api/auth/`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
