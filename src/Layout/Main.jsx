import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import "aos/dist/aos.css";
import AOS from 'aos';
AOS.init();
const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="lg:min-h-[calc(100vh-64px)] overflow-x-auto">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
