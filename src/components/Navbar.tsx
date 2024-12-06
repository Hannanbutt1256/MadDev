import logo from "../assets/logo.png";
import { BsMoon, BsSun, BsBell, BsSearch } from "react-icons/bs"; // Importing icons
import { useTheme } from "../common/ThemeProvider";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState } from "react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for search bar visibility

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      toggleDropdown();
      console.log("User successfully logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    // Logo and Search Input
    <div className="sticky top-0 z-50 flex justify-between items-center px-10 bg-light-background dark:bg-dark-card">
      <div className="flex items-center gap-4">
        <Link to="">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </Link>
        <div className="hidden md:block">
          <input
            type="search"
            className="p-2 rounded-md w-80 lg:w-96 outline-none border border-light-subtext hover:border-light-text dark:border-dark-subtext bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Mobile Search Bar */}
      {isSearchVisible && (
        <div className="absolute top-16 left-0 w-full md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsSearchVisible(false)} // Closes the search bar when the overlay is clicked
          ></div>

          {/* Search Input */}
          <input
            type="search"
            className="relative z-20 p-2 rounded-md w-full outline-none border border-light-subtext hover:border-light-text dark:border-dark-subtext bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
            placeholder="Search..."
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSearchVisibility}
          className="md:hidden p-2 rounded-full focus:outline-none"
        >
          <BsSearch className="text-xl text-gray-400 hover:text-light-button" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full focus:outline-none flex items-center justify-center"
        >
          {isDarkMode ? (
            <BsSun className="text-xl text-yellow-500" />
          ) : (
            <BsMoon className="text-xl text-gray-400 hover:text-light-button " />
          )}
        </button>
        {user && (
          <>
            <Link to={"notifications"}>
              <BsBell className="text-xl text-gray-400 hover:text-light-button " />
            </Link>
            <Link to="create-post">
              <button className="p-2 rounded-md border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text">
                Create Post
              </button>
            </Link>
            <div className="relative">
              <img
                src={user.photoURL || "/src/assets/no-pf.svg"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-light-background dark:bg-dark-card shadow-lg rounded-md py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <>
            <Link to="auth/login">
              <button className="p-2 rounded-md dark:border-dark-subtext text-light-text hover:text-light-button hover:bg-opacity-10 dark:text-dark-text hover:bg-light-hover  dark:hover:text-dark-button">
                Login
              </button>
            </Link>
            <Link to="auth/register">
              <button className="p-2 rounded-md border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text">
                Create Account
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
