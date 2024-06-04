import { Link, useLocation, useNavigate } from "react-router-dom";
import loginBg from "../../src/assets/LoginBg.jpg";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";

import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, updateUser, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      const result = await createUser(data?.email, data?.password);
      console.log("Result from createUser:", result);

      if (result?.user) {
        console.log("User created, updating profile...");
        await updateUser(data?.name, data?.photo).then(async () => {
          const userInfo = {
            name: data.name,
            email: data.email,
            role: "User",
          };
          console.log("User info to be posted:", userInfo);

          try {
            const res = await axiosPublic.post("/users", userInfo);
            console.log("Response from POST /users:", res);

            if (res.data.insertedId) {
              setUser({
                ...result?.user,
                photoURL: data?.photo,
                displayName: data?.name,
              });
              navigate(location?.state ? location?.state : "/");
              toast.success("Registration Successful");
              console.log("User added to database");
            } else {
              console.log("Failed to insert user into the database");
            }
          } catch (postError) {
            console.error("Error posting user info:", postError);
            toast.error("Failed to add user to database");
          }
        });

        const loggedUser = result?.user;
        console.log("Logged user:", loggedUser);
      } else {
        toast.error("Email is already in use");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message);
    }
  };

  //   console.log(watch("password"));
  const [showPass, setShowPass] = useState(false);
  return (
    <div
      className="px-6 mx-auto"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex flex-col items-center py-6 sm:px-36 px-6 lg:h-screen lg:flex-row">
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
          <ul className="mt-4 text-gray-100 list-disc list-inside">
            <li>
              <strong>Explore Thousands of Scholarships:</strong> Discover
              scholarships tailored to your unique profile and academic goals.
            </li>
            <li>
              <strong>Easy Application Process:</strong> Apply to multiple
              scholarships with our simplified application system.
            </li>
            <li>
              <strong>Stay Updated:</strong> Get real-time updates and
              notifications about your application status and new scholarship
              opportunities.
            </li>
          </ul>
        </div>

        <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
          <div className="w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
            <div className="px-6 py-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                Register
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 space-y-2">
                  <div className="text-left">
                    <label
                      htmlFor="name"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Your Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      name="name"
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                      type="text"
                      placeholder="Your Name"
                      aria-label="Your Name"
                    />
                    {errors.name?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1 text-left">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", { required: true })}
                      name="email"
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                    />
                    {errors.email?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1 text-left">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="text-left relative">
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                      })}
                      name="password"
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      aria-label="Password"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1 text-left">
                        This field is required
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-500 text-xs mt-1 text-left">
                        Password must be 6 charecter
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-500 text-xs mt-1 text-left">
                        Password must have at least one special character,
                        uppercase, lowercase and number{" "}
                      </span>
                    )}
                    <div>
                      {showPass ? (
                        <BiShow
                          onClick={() => setShowPass(false)}
                          className="top-10 right-4 absolute"
                        ></BiShow>
                      ) : (
                        <BiHide
                          onClick={() => setShowPass(true)}
                          className="top-10 right-4 absolute"
                        ></BiHide>
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="photo"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Upload Image URL
                    </label>
                    <input
                      {...register("photo", { required: true })}
                      name="photo"
                      type="text"
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                    />
                    {errors.photo?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1 text-left">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-6 sm:mt-0 mt-4 py-2 font-medium text-white transition-colors duration-300 transform bg-violet-500 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700"
                  >
                    Register
                  </button>
                </div>
                <div className="mt-6">
                  <Link
                    to="/login"
                    className="text-sm text-gray-600 dark:text-gray-200 hover:underline"
                  >
                    Already have an account?{" "}
                    <span className="text-violet-500">Login</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
