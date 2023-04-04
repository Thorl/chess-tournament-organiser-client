import { Outlet } from "react-router-dom";

import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const NavLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
