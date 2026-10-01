import axios from "axios";

const instance = axios.create({
  baseURL: "https://lunlunneko-ydplab.hf.space/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
