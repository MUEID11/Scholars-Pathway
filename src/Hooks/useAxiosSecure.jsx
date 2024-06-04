import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access-token");
    console.log("intercepting request", token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }),
    function (error) {
      return Promise.reject(error);
    };

  //handle error status
  axiosSecure.interceptors.response.use(
    function (response) {
      console.log("response from inrerceptor", response);
      return response;
    },
    async (error) => {
      console.log("error from interceptor", error);
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};
export default useAxiosSecure;
