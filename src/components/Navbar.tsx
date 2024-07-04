import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex justify-between items-center p-4 text-primary shadow-md bg-secondary w-full">
      <div>
        <div className="flex ">
           <img
              src="../src/assets/images/logo_img.jpg"
              alt="Profile"
              className="w-14 h-14 rounded-full"
           /> 
            <button onClick={handleNavigateToHome} className="text-3xl ml-5 font-bold">
            SafeSpoon
             </button>
        </div>
      
        
      </div>
      <div className="flex space-x-4">
        <button onClick={handleNavigateToProfile} className="text-primary">
          Profile
        </button>
        <button
          onClick={handleNavigateToAbout}
          className="text-white bg-ternery px-4 py-2 rounded-md "
        >
          About
        </button>
        <button
          onClick={handleLogout}
          className="text-white bg-ternery px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
