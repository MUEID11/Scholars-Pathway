import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaRegUser, FaUserEdit } from "react-icons/fa";
import { TbUserShield } from "react-icons/tb";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BiIdCard } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { RiLoginBoxLine } from "react-icons/ri";

const Profile = () => {
  const { user } = useAuth();
  console.log("auth provider user", user);
  const axiosSecure = useAxiosSecure();
  const { data: loggedUser = {} } = useQuery({
    queryKey: [user?.email, "profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile/${user?.email}`);
      console.log(res.data.data);
      return res.data;
    },
  });
  const creationDate = user?.metadata?.creationTime;
  const date = new Date(creationDate);
  const formattedDate = date.toDateString();
  const dateString = user?.metadata?.lastSignInTime;
  const signIndate = new Date(dateString);
  const dayName = signIndate.toLocaleDateString("en-US", { weekday: "long" });
  const time = signIndate.toLocaleTimeString("en-US", { hour12: true });
  return (
    <div className="relative w-full max-w-sm sm:max-w-full sm:min-h-[calc(100vh-150px)] overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-cover object-center w-full h-56"
        src={user?.photoURL}
        alt="avatar"
      />
      <div className="absolute top-12 left-4">
        <img src={user?.photoURL} className="rounded-full size-20 sm:size-36 border-4 border-violet-500" alt="" />
      </div>
      <div className="flex items-center px-6 py-3 bg-yellow-500">
        <h1 className="mx-3 text-lg font-semibold text-white">
          {loggedUser?.role === "User" ? (
            <span className="flex items-center justify-center">
              <FaRegUser />
            </span>
          ) : loggedUser?.role === "Admin" ? (
            <span>
              <TbUserShield />
            </span>
          ) : (
            <span>
              <FaUserEdit />
            </span>
          )}
        </h1>
        <h1 className="w-6 h-6 text-white fill-current">{loggedUser?.role}</h1>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {loggedUser?.name}
        </h1>

        <p className="py-2 text-gray-700 dark:text-gray-400 flex items-center">
          <span>
            <TfiEmail className="mr-4 font-md" />
          </span>
          Email: {loggedUser?.email}
        </p>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <span className="w-6 h-6 flex items-center justify-center">
            <MdOutlineCalendarMonth />
          </span>
          <h1 className="px-2 text-sm">Since: {formattedDate}</h1>
        </div>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          {/* Location Pin Icon */}
          <span className="w-6 h-6 flex items-center justify-center">
            <RiLoginBoxLine />
          </span>
          <h1 className="px-2 text-sm">
            Last signin at: {dayName}, {time}
          </h1>
        </div>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          {/* Email Icon */}
          <span className="w-6 h-6 flex items-center justify-center">
            <BiIdCard />
          </span>
          <h1 className="px-2 text-sm">
            {loggedUser?.role} id: {loggedUser?._id?.split(0, 9)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
