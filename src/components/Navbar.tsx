import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  const { token, setToken } = useAuth();

  return (
    <nav className="bg-white p-4 text-black dark:bg-primary dark:text-quaternary">
      <div className="mx-auto flex items-center">
        <div className="w-full text-2xl font-bold">
          <NavLink to="/">Safe Spoon</NavLink>
        </div>

        <div className="flex w-full items-center justify-end gap-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-600"
                : "hover:text-indigo-600 dark:text-quaternary"
            }
          >
            About
          </NavLink>

          {!token ? (
            <>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-indigo-600"
                    : "hover:text-indigo-600 dark:text-quaternary"
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-indigo-600"
                    : "hover:text-indigo-600 dark:text-quaternary"
                }
              >
                Sign Up
              </NavLink>
              <ModeToggle />
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-indigo-600"
                    : "hover:text-indigo-600 dark:text-quaternary"
                }
              >
                Profile
              </NavLink>
              <Button
                onClick={() => setToken(null)}
                variant="green"
                className="ml-2"
              >
                Logout
              </Button>
              <ModeToggle />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
