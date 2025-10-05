import { Outlet } from "react-router";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import SettingsModal from "../../ui/SettingsModal/SettingsModal";
import { useSettings } from "../../../hooks/useSettings";

const DashboardLayout = () => {
  const { navbarLayout } = useSettings();

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-[#000010] dark:text-[#fbfbfb]">
      <Sidebar />

      <div
        className={`transition-all duration-300 ${
          navbarLayout === "sidebar" ? "lg:ml-64 ml-12" : "ml-0"
        }`}
      >
        {navbarLayout === "header" && <Header />}

        <div
          className={`p-[1.5rem] ${navbarLayout === "sidebar" ? "pt-6" : ""}`}
        >
          <Outlet />
        </div>

        <Footer />
      </div>

      <SettingsModal />
    </div>
  );
};

export default DashboardLayout;
