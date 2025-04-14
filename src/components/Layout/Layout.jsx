import React from "react";
import Router from "../../Routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNavbar from "../TopNavbar/TopNavbar";

const Layout = () => {
  return (
    <>
      <div className="layout flex">
        <Sidebar />
        <div className="main_layout flex-1 md:ml-[250px]">
          <TopNavbar />
          <div className="content p-4">
            <Router />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
