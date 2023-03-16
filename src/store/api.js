import axios from "axios";

export const api = axios.create({
  baseURL: 'http://52.76.154.18:8084'
});

