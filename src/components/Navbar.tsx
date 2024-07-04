const Navbar: React.FC = () => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-2xl font-bold">safeSpoon</h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="text-secondary bg-ternery px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
