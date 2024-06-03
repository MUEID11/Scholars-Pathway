import { useState } from "react";
import { MdClose, MdMenu, MdOutlineContactMail } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../public/vite.png";
import { BiComment, BiHome, BiLogOut } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

const Dashboard = () => {
  const isAdmin = true;
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User Logged Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <section className="flex">
      <div
        className={`fixed inset-y-0 left-0 z-30 min-w-64 md:w-72 lg:w-96 bg-white  shadow-lg sm:h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:relative sm:w-96 sm:block`}
      >
        <aside className="h-full p-4">
          {/* <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none sm:hidden"
          >
            <MdClose />
          </button> */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img className="w-auto h-6 sm:h-10" src={logo} alt="" />
              <span className="text-sm sm:text-xl font-bold text-violet-500">
                Scholar Pathway
              </span>
            </Link>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-8 sm:w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full">
            <div className="flex flex-col items-center justify-center sm:font-medium space-y-2">
              {isAdmin ? (
                <div className="tracking-tighter">
                  <NavLink
                    to="/dashboard/profile"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BsPerson className="mr-4" />
                    </span>{" "}
                    Admin Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/application"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <MdOutlineContactMail className="mr-4" />
                    </span>
                    Add scholarship
                  </NavLink>
                  <NavLink
                    to="/dashboard/myreviews"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BiComment className="mr-4" />
                    </span>
                    Manage Scholarship
                  </NavLink>
                  <NavLink
                    to="/dashboard/myreviews"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BiComment className="mr-4" />
                    </span>
                   Manage Applied Application
                  </NavLink>
                  <NavLink
                    to="/dashboard/manageusers"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BiComment className="mr-4" />
                    </span>
                    Manage Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/myreviews"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BiComment className="mr-4" />
                    </span>
                    My Review
                  </NavLink>
                </div>
              ) : (
                <>
                  <NavLink
                    to="/dashboard/profile"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BsPerson className="mr-4" />
                    </span>{" "}
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/application"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <MdOutlineContactMail className="mr-4" />
                    </span>
                    My Application
                  </NavLink>
                  <NavLink
                    to="/dashboard/myreviews"
                    className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                  >
                    <span>
                      <BiComment className="mr-4" />
                    </span>
                    My Review
                  </NavLink>
                </>
              )}
            </div>
            <hr className="my-6" />
            <NavLink
              to="/"
              className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center"
            >
              <span>
                <BiHome className="mr-4" />
              </span>
              Home
            </NavLink>
            <div className="absolute bottom-8 w-full p-6 right-0">
              <button
                onClick={handleLogout}
                className="w-full bg-violet-500 p-2 sm:p-4 rounded flex items-center justify-center font-semibold"
              >
                <span>
                  <BiLogOut className="mr-4" />
                </span>
                Logout
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex-grow">
        <nav className="relative bg-white shadow-sm dark:bg-gray-800">
          <div className="px-6 py-4">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex items-center justify-between">
                <a className="sm:text-xl font-bold text-gray-500 p-1">
                  <p>{user?.displayName}'s Dashbord</p>
                </a>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                    aria-label="toggle menu"
                  >
                    {!isOpen ? <MdMenu /> : <MdClose />}
                  </button>
                </div>
              </div>

              {/* Profile Section */}
              <div className="hidden lg:block">
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  aria-label="toggle profile dropdown"
                ></button>
              </div>
            </div>
          </div>
        </nav>
        <div className="mx-4 sm:mx-8 my-6">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
