import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="bg-light-background dark:bg-black text-light-text dark:text-dark-text ">
      <Navbar />
      <div className="md:flex md:ml-4 md:mt-4 ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
