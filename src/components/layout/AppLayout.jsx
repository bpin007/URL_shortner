import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container w-[95%] mx-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center text-white bg-gray-800 mt-10">
        Made with ❤️ by Developer Bipin
      </div>
    </div>
  );
};

export default AppLayout;
