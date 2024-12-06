import {
  HiOutlineHome,
  HiOutlineBookmark,
  HiOutlineMicrophone,
  HiOutlinePhone,
  HiOutlineQuestionMarkCircle,
  HiOutlineBookOpen,
} from "react-icons/hi";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close menu when window is resized to >= 768px
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Clean up
  }, []);
  return (
    <>
      <div>
        <button onClick={toggleMenu} className="md:hidden pl-10 mt-4">
          {!isMenuOpen && (
            <AiOutlineMenu className="text-2xl  text-light-text dark:text-dark-text" />
          )}
        </button>
      </div>
      <div className=" h-screen rounded-md bg-light-background dark:bg-black  text-dark-text ">
        <div className=" hidden   mt-4 md:flex md:flex-col  ">
          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md  dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/")}
          >
            <HiOutlineHome className="text-xl" />
            Home
          </button>

          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/subscription")}
          >
            <img src={logo} alt="" className="w-[20px] h-[20px]" />
            MadDev++
          </button>
          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/podcasts")}
          >
            <HiOutlineMicrophone className="text-xl" />
            Podcasts
          </button>
          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/save-post")}
          >
            <HiOutlineBookmark className="text-xl" />
            Saved
          </button>
          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/about")}
          >
            <HiOutlineBookOpen className="text-xl" />
            About
          </button>
          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/help")}
          >
            <HiOutlineQuestionMarkCircle className="text-xl" />
            Help
          </button>
          <button
            className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button text-light-text"
            onClick={() => navigate("/contact")}
          >
            <HiOutlinePhone className="text-xl" />
            Contact
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col p-5">
          <div className="flex flex-col ">
            <button onClick={toggleMenu} className="md:hidden ">
              {isMenuOpen && (
                <AiOutlineClose className="text-2xl text-light-text dark:text-dark-text " />
              )}
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/");
                toggleMenu();
              }}
            >
              <HiOutlineHome className="text-xl" />
              Home
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/subscription");
                toggleMenu();
              }}
            >
              <img src={logo} alt="" className="w-[20px] h-[20px]" />
              MadDev++
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/podcasts");
                toggleMenu();
              }}
            >
              <HiOutlineMicrophone className="text-xl" />
              Podcasts
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/save-post");
                toggleMenu();
              }}
            >
              <HiOutlineBookmark className="text-xl" />
              Saved
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/about");
                toggleMenu();
              }}
            >
              <HiOutlineBookOpen className="text-xl" />
              About
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/help");
                toggleMenu();
              }}
            >
              <HiOutlineQuestionMarkCircle className="text-xl" />
              Help
            </button>
            <button
              className="py-2 pl-10 pr-20 flex items-center gap-2 text-xl rounded-md dark:hover:bg-dark-hover3 dark:hover:text-dark-text2 dark:hover:opacity-75 dark:text-dark-text hover:bg-light-hover hover:bg-opacity-10 hover:text-light-button"
              onClick={async () => {
                await navigate("/contact");
                toggleMenu();
              }}
            >
              <HiOutlinePhone className="text-xl" />
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
