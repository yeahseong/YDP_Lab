import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex justify-center items-center p-4 ">
      <Outlet />
    </div>
  );
};

export default Layout;
