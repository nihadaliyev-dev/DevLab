import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DashboardLayout = () => {
  return (
    <div className="p-[1.5rem] bg-[#000010] overflow-hidden">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default DashboardLayout;
