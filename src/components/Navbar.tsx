import logo1 from "../assets/4th Logo Black.svg";
import logo from "../assets/4th Logo White.svg";
import { BsMoon, BsSun, BsBell, BsSearch } from "react-icons/bs"; // Importing icons
import { useTheme } from "../common/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../store/user/userThunks";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { Profileuser } = useSelector((state: RootState) => state.userProfile);
  const { isDarkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile(user.uid));
    }
  }, [user, dispatch]);
  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      toggleDropdown();
      navigate("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    // Logo and Search Input
    <div className="sticky top-0 z-50 flex justify-between items-center px-10 bg-light-background dark:bg-black h-16 ">
      <div className="flex items-center gap-4 ">
        <Link to="">
          <img src={isDarkMode ? logo : logo1} alt="Logo" className="w-8 h-8" />
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
              <button className="p-2  hidden md:flex rounded-md border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text">
                Create Post
              </button>
            </Link>
            <Link to="create-podcast">
              <button className="p-2  hidden md:flex rounded-md border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text">
                Post a Podcast
              </button>
            </Link>
            <div className="relative">
              <img
                src={Profileuser?.profilePicture || "/src/assets/no-pf.svg"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div ref={dropdownRef} className="dropdown">
                  <div className="absolute right-0 mt-2 w-48 bg-light-background dark:bg-dark-card shadow-lg rounded-md py-2">
                    <Link
                      to="/profile"
                      onClick={toggleDropdown}
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
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <>
            <Link to="auth/login">
              <button className="p-2 rounded-md hidden md:flex dark:border-dark-subtext text-light-text hover:text-light-button hover:bg-opacity-10 dark:text-dark-text hover:bg-light-hover  dark:hover:text-dark-button">
                Login
              </button>
            </Link>
            <Link to="auth/register">
              <button className="p-2 rounded-md hidden md:flex border border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text">
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
