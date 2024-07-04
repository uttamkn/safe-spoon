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
    <div className="flex justify-between items-center p-4 text-primary shadow-md bg-secondary w-screen">
      <div>
        <button onClick={handleNavigateToHome} className="text-2xl font-bold">
          safeSpoon
        </button>
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
