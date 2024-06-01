import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
