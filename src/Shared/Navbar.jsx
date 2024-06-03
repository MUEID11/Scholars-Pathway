import { useState } from "react";
import logo from "../../public/vite.png";
import { CgClose, CgMenu } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logOut()
    .then(()=> {
        toast.success('User Logged Out')
    })
    .catch(error => {
        console.log(error.message)
    })
  }
  const navlinks = (
    <>
      <>
        <NavLink
          to="/"
          activeclassname="active"
          className="nav-link  py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200 "
        >
          Home
        </NavLink>
        <NavLink
          to="/all"
          activeclassname="active"
          className="nav-link  py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200 "
        >
          All Scholarships
        </NavLink>
        <NavLink
          to="/dashboard"
          activeclassname="active"
          className="nav-link  py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200 "
        >
          Dash Board
        </NavLink>
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="nav-link py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              activeclassname="active"
              className="nav-link  py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200 "
            >
              Login
            </NavLink>
          </>
        )}
      </>
    </>
  );
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center justify-center ">
              <img className="w-auto h-6 sm:h-10" src={logo} alt="" />
              <span className="text-xl font-bold text-violet-500">
                Scholar Pathway
              </span>
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <CgClose className="text-2xl" />
                ) : (
                  <CgMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100 "
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {navlinks}
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                <a className="justify-between">
            {user?.displayName}
            <span className="badge">Role</span>
          </a>
                </li>
                <li>
                  <a  onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
