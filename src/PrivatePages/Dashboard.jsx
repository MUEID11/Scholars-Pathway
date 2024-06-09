import { useState } from "react";
import { MdClose, MdMenu, MdOutlineContactMail } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../public/vite.png";
import { BiComment, BiHome, BiLogOut } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import useAdmin from "../Hooks/useAdmin";
import { TbUsersGroup } from "react-icons/tb";
import { IoDocumentsOutline } from "react-icons/io5";
import { SiSemanticscholar } from "react-icons/si";
import useModerator from "../Hooks/useModerator";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
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
        className={`fixed inset-y-0 left-0 z-30 min-w-64 md:w-72 lg:w-96 bg-white  shadow-lg sm:min-h-screen  transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:relative sm:w-96 sm:block`}
      >
        <aside className="h-full p-4 flex flex-col justify-between">
          <div className="flex-grow">
            {/* Links and other content */}
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img className="w-auto h-6 sm:h-10" src={logo} alt="" />
                <span className="text-sm sm:text-xl font-bold text-violet-500">
                  Scholar Pathway
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none sm:hidden"
              >
                <MdClose />
              </button>
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
                      to="/dashboard/addscholarship"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <MdOutlineContactMail className="mr-4" />
                      </span>
                      Add scholarship
                    </NavLink>
                    <NavLink
                      to="/dashboard/managescholarship"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <SiSemanticscholar className="mr-4" />
                      </span>
                      Manage Scholarship
                    </NavLink>
                    <NavLink
                      to="/dashboard/appliedscholarship"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <IoDocumentsOutline className="mr-4" />
                      </span>
                      Manage Applied Applications
                    </NavLink>
                    <NavLink
                      to="/dashboard/manageusers"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <TbUsersGroup className="mr-4" />
                      </span>
                      Manage Users
                    </NavLink>
                    <NavLink
                      to="/dashboard/allreviews"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <BiComment className="mr-4" />
                      </span>
                      All Review
                    </NavLink>
                  </div>
                ) : isModerator ? (
                  <div className="tracking-tighter">
                    <NavLink
                      to="/dashboard/profile"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <BsPerson className="mr-4" />
                      </span>{" "}
                      Moderator Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard/addscholarship"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <MdOutlineContactMail className="mr-4" />
                      </span>
                      Add scholarship
                    </NavLink>
                    <NavLink
                      to="/dashboard/managescholarship"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <SiSemanticscholar className="mr-4" />
                      </span>
                      Manage Scholarship
                    </NavLink>
                    <NavLink
                      to="/dashboard/appliedApplication"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <IoDocumentsOutline className="mr-4" />
                      </span>
                      Manage Applied Applications
                    </NavLink>
                    <NavLink
                      to="/dashboard/myreviews"
                      className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center "
                    >
                      <span>
                        <BiComment className="mr-4" />
                      </span>
                      All review
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
                      My review
                    </NavLink>
                  </>
                )}
              </div>
              <hr className="my-6" />
              <NavLink
                to="/"
                className="dashlinks w-full p-2 sm:p-4 rounded-md text-left flex items-center mx-10"
              >
                <span>
                  <BiHome className="mr-4" />
                </span>
                Home
              </NavLink>
            </div>
          </div>
          {/* Logout button at the bottom */}
          <div className="p-8">
            <button
              onClick={handleLogout}
              className="bg-violet-400 p-2 sm:p-4 rounded flex items-center justify-center font-semibold w-full"
            >
              <span>
                <BiLogOut className="mr-4" />
              </span>
              Logout
            </button>
          </div>
        </aside>
      </div>
      <div className="flex-grow">
        <nav className="bg-white shadow-sm dark:bg-gray-800">
          <div className="px-6 py-4">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex items-center justify-between">
                <a className="sm:text-xl font-bold text-gray-500 p-1">
                  <p>Dashabord of {user?.displayName} </p>
                </a>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                    aria-label="toggle menu"
                  >
                    {!isOpen ? <MdMenu /> : <MdClose className="hidden" />}
                  </button>
                </div>
              </div>

              {/* Profile Section */}
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
