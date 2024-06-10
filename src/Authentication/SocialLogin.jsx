import { FaGoogle } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                email: res?.user?.email,
                name: res?.user?.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate(location?.state ? location?.state : "/");
                toast.success("sign in successfull")
            })
        })
    }
    return (
        <div onClick={handleGoogleSignIn}>
             <div
                    className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 "
                  >
                    <div className="px-4 py-2">
                      <FaGoogle />
                    </div>
                    <span className="w-5/6 px-4 py-3 font-bold text-center">
                      Sign in with Google
                    </span>
                  </div>
        </div>
    );
};

export default SocialLogin;