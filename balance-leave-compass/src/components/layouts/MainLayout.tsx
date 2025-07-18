import { Outlet } from "react-router";

import Header from "@/components/layouts/Header";
import Navigation from "./Navigation";

function MainLayout() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Navigation />
          <main className="flex-1 px-[20px] md:p-[24px]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
