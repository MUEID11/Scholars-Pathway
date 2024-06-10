import axios from "axios";

export const axiosPublic = axios.create( {
    baseURL: 'https://b9-assignment12-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;