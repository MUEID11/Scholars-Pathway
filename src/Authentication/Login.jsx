import { Link, useLocation, useNavigate } from "react-router-dom";
import loginBg from "../../src/assets/LoginBg.jpg";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { PiXLogoBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";
const Login = () => {
  //task remain: social login and setting user to data base
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await logIn(data?.email, data?.password);
      console.log(result);
      navigate(location?.state ? location?.state : "/");
      toast.success("Sign In Succesfull");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className="px-6 container mx-auto"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex flex-col items-center py-6 px-6 lg:h-screen lg:flex-row">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-semibold text-violet-400 lg:text-4xl">
            Scholar Pathway
          </h2>

          <h3 className="mt-2 text-2xl font-semibold text-violet-400">
            Hello <span className=" text-yellow-500">Guest</span>
          </h3>

          <p className="mt-4 text-gray-100">
            Unlock your future with opportunities that can change your life. Our
            platform offers a seamless experience to search, apply, and track
            your scholarship applications all in one place.
          </p>
        </div>

        <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
          <div className="w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
            <div className="px-6 py-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                Sign In
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <input
                    {...register("email", { required: true })}
                    name="email"
                    className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                  />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                  <div className="relative">
                    <input
                      {...register("password", { required: true })}
                      name="password"
                      className="block relative w-full px-4 py-2 mt-4 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      aria-label="Password"
                    />
                    {errors.exampleRequired && (
                      <span>This field is required</span>
                    )}
                    <div className="">
                      {showPass ? (
                        <BiShow
                          onClick={() => setShowPass(false)}
                          className="absolute top-3 right-4"
                        ></BiShow>
                      ) : (
                        <BiHide
                          onClick={() => setShowPass(true)}
                          className=" absolute top-3 right-4"
                        ></BiHide>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between mt-4 sm:flex-row ">
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-200 hover:underline"
                  >
                    Forget Password?not functional
                  </a>

                  <button
                    type="submit"
                    className="px-6 py-2 sm:mt-0 mt-4 font-medium text-white transition-colors duration-300 transform bg-yellow-500 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700"
                  >
                    Sign In
                  </button>
                 
                </div>
              </form>
              <hr className="my-6" />
                <SocialLogin></SocialLogin>
              <div className="mt-6">
                <Link
                  to="/register"
                  className="text-sm text-gray-600 dark:text-gray-200 hover:underline"
                >
                  Dont have an account?{" "}
                  <span className="text-violet-500">Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
