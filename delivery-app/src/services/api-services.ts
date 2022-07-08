import axios from "axios";

const apiGateway = axios.create({
  baseURL: "http://localhost:3000",
});

apiGateway.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiGateway.interceptors.response.use((res) => {
  return res.data;
});

export default apiGateway;
