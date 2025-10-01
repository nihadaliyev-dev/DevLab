import { memo, useState } from "react";
import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";
import ProfileAndNotifications from "./ProfileAndNotifications/ProfileAndNotifications";
import Search from "./Search/Search";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import MobileMenu from "./MobileMenu/MobileMenu";

const Header = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="relative flex items-center justify-between rounded-full py-[0.5rem] px-[1rem] bg-gradient-to-b from-[#0022aaaf] to-[transparent] border-[1px] border-[#fbfbfb80] backdrop-blur-md shadow-[0_8px_32px_rgba(0,34,170,0.3)] hover:shadow-[0_12px_40px_rgba(0,34,170,0.4)] transition-all duration-500 ease-out animate-fade-in-down">
        <div className="flex-shrink-0 z-50 animate-scale-in">
          <Logo />
        </div>

        <div
          className="hidden lg:flex items-center gap-4 flex-1 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <Navbar />
        </div>

        <div
          className="hidden md:block flex-shrink-0 animate-slide-in-left"
          style={{ animationDelay: "0.2s" }}
        >
          <Search />
        </div>

        <div
          className="hidden lg:flex items-center gap-3 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <ThemeSwitch />
          <ProfileAndNotifications />
        </div>

        <button
          onClick={handleMobileMenuToggle}
          className="lg:hidden relative z-50 p-2 rounded-full bg-[#0E1520]/80 backdrop-blur-sm border border-[#fbfbfb20] hover:bg-[#1a2332]/80 transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(0,34,170,0.3)] animate-scale-in"
          style={{ animationDelay: "0.4s" }}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 bg-[#fbfbfb] transition-all duration-500 ease-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#fbfbfb] mt-1 transition-all duration-500 ease-out ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#fbfbfb] mt-1 transition-all duration-500 ease-out ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </div>
        </button>

        <div
          className="lg:hidden flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <ThemeSwitch />
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
    </>
  );
});

export default Header;
