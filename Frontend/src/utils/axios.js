import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // change this to your backend base URL
  withCredentials: true, // if you're using cookies/sessions
});

export default instance;
