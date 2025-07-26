import axios from "axios";

const instance = axios.create({
  baseURL: "https://eatwise-ehgs.onrender.com", // change this to your backend base URL
  withCredentials: true, // if you're using cookies/sessions
});

export default instance;
