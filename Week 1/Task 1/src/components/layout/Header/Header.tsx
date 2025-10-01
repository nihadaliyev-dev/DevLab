import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";
import ProfileAndNotifications from "./ProfileAndNotifications/ProfileAndNotifications";
import Search from "./Search/Search";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";

const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-full py-[0.5rem] px-[1rem] bg-linear-to-b from-[#0022aaaf] to-[transparent] border-[1px] border-[#fbfbfb80] bg-botom">
      <Logo />
      <Search />
      <Navbar />
      <ThemeSwitch />
      <ProfileAndNotifications />
    </header>
  );
};

export default Header;
