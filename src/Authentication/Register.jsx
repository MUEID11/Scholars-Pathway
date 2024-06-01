import { Link } from "react-router-dom";
import loginBg from "../../src/assets/LoginBg.jpg";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
  return (
    <div
      className="px-6 mx-auto"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
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

              <form action="#">
                <div className="mt-4 space-y-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Your Name
                    </label>
                    <input
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                      type="text"
                      placeholder="Your Name"
                      aria-label="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Email
                    </label>
                    <input
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Password
                    </label>
                    <input
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      aria-label="Password"
                    />
                   <div >
                    {
                        showPass ? <BiShow onClick={() => setShowPass(false)} className="bottom-3 right-4 absolute"></BiShow> : <BiHide onClick={()=>setShowPass(true)} className="bottom-3 right-3 absolute"></BiHide>
                    }
                   </div>
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm text-gray-500 dark:text-gray-300 text-left"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button className="px-6 sm:mt-0 mt-4 py-2 font-medium text-white transition-colors duration-300 transform bg-violet-500 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700">
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
