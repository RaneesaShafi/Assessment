import React, { useState } from "react";
import Router from "../../Routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNavbar from "../TopNavbar/TopNavbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout min-h-screen flex">

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col pl-0 md:pl-[240px] transition-all duration-300">
        <TopNavbar isSidebarOpen={isSidebarOpen} />
        <div className="content flex-1 p-4 "> 
          <Router />
        </div>
      </div>
    </div>
  );
};


export default Layout;