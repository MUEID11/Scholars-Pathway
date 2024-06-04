
import useAuth from "../../Hooks/useAuth";



const Profile = () => {
  const {user} = useAuth();
    
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm md:max-w-lg mx-auto">
        
      <div
        className="w-full h-96 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{backgroundImage: `url(${user?.photoURL})`}}
      ></div>

      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-72 dark:bg-gray-800">
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          {user?.displayName}
        </h3>

        <div className=" px-3 py-2 bg-gray-200 dark:bg-gray-700 text-center text-sm">
          <span className="font-bold text-slate-100 dark:text-gray-200 bg-gray-800 px-2 py-2 rounded-md text-center">
            {user?.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
