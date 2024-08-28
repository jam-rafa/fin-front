import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://fintech-y3e0.onrender.com/api",

});

export default Api;
