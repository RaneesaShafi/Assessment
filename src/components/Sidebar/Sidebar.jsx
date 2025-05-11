import React from "react";
import { GiRaceCar } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaCarOn } from "react-icons/fa6";
import { GiSteeringWheel } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineFeedback } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navLinks = [
    {
      path: "/dashboard",
      icon: <RiDashboardFill />,
      display: "Dashboard",
    },
    {
      path: "/races",
      icon: <FaCarOn />,
      display: "Races",
    },
    {
      path: "/drivers",
      icon: <RiTeamFill />,
      display: "Drivers",
    },
    {
      path: "/constructors",
      icon: <GiSteeringWheel />,
      display: "Constructors",
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Collapse button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[1000] p-2 rounded-md"
        style={{ backgroundColor: "var(--primary-color)" }}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <FiX className="text-white text-2xl" />
        ) : (
          <FiMenu className="text-white text-2xl" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar w-[240px] h-full fixed top-0 left-0 z-[999] p-4 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="sidebar_top w-full h-[40px]">
          <h2 className="flex items-center gap-x-2 text-white font-bold text-2xl">
            <span className="w-[40px] h-[37px] flex items-center justify-center rounded-full border-indigo-400 border-2 bg-indigo-400">
              <GiRaceCar className="text-3xl" />
            </span>
            SpeedeX
          </h2>
        </div>

        <div className="sidebar_content flex justify-between flex-col h-[calc(100%-80px)] mt-8">
          <div className="menu h-[80%] overflow-y-auto">
            <ul className="nav_list flex flex-col gap-[2rem]">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 p-1 text-white bg-white/10 font-semibold rounded-md"
                        : "flex items-center gap-2 p-1 text-gray-400 hover:text-white"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="inline-block">{item.icon}</span>
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar_bottom">
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 p-1 text-white bg-white/10 font-semibold rounded-md"
                  : "flex items-center gap-2 p-1 text-gray-400 hover:text-white"
              }
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineFeedback className="inline-block" />
              Feedback
            </NavLink>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[998]"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;