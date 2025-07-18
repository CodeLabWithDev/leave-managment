import { Outlet } from "react-router";

function BlankLayout() {
  return (
    <main className="h-screen px-[20px] md:px-[24px]">
      <Outlet />
    </main>
  );
}

export default BlankLayout;
