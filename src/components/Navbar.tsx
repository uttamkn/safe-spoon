import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ModeToggle from "./ModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white p-4 text-black dark:bg-primary dark:text-quaternary">
      <div className="mx-auto flex items-center">
        <div className="w-full text-2xl font-bold">
          <NavLink to="/">Safe Spoon</NavLink>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
          </button>
        </div>

        <div className="hidden w-full items-center justify-end gap-6 md:flex">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-600"
                : "hover:text-indigo-600 hover:underline dark:text-quaternary"
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
                    : "hover:text-indigo-600 hover:underline dark:text-quaternary"
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-indigo-600"
                    : "hover:text-indigo-600 hover:underline dark:text-quaternary"
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
                    : "hover:text-indigo-600 hover:underline dark:text-quaternary"
                }
              >
                Profile
              </NavLink>
              <div
                onClick={() => setToken(null)}
                className="cursor-pointer font-medium hover:underline dark:text-quaternary"
              >
                Logout
              </div>
              <ModeToggle />
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute right-6 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-indigo-600"
                  : "hover:text-indigo-600 hover:underline dark:text-quaternary"
              }
              onClick={() => setIsMenuOpen(false)}
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
                      : "hover:text-indigo-600 hover:underline dark:text-quaternary"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-indigo-600"
                      : "hover:text-indigo-600 hover:underline dark:text-quaternary"
                  }
                  onClick={() => setIsMenuOpen(false)}
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
                      : "hover:text-indigo-600 hover:underline dark:text-quaternary"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <div
                  onClick={() => {
                    setToken(null);
                    setIsMenuOpen(false);
                  }}
                  className="cursor-pointer font-medium hover:underline dark:text-quaternary"
                >
                  Logout
                </div>
                <ModeToggle />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
