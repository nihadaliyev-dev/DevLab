import { Outlet } from "react-router";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import SettingsModal from "../../ui/SettingsModal/SettingsModal";
import { useSettings } from "../../../hooks/useSettings";

const DashboardLayout = () => {
  const { navbarLayout } = useSettings();

  return (
    <div className="min-h-screen bg-[#000010] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ${
          navbarLayout === "sidebar" ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header - only show in header layout */}
        {navbarLayout === "header" && <Header />}

        {/* Main content */}
        <div
          className={`p-[1.5rem] ${navbarLayout === "sidebar" ? "pt-6" : ""}`}
        >
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
};

export default DashboardLayout;
