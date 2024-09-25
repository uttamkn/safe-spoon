import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NavbarLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default NavbarLayout;
