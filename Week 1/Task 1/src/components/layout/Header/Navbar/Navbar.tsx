import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <ul className="flex items-center gap-[0.25rem]">
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-[1.25rem] py-[0.5rem] rounded-full text-sm border-1 border-transparent transition-colors ${
              isActive
                ? "text-shadow-[0px_0px_1px] text-shadow-[#fbfbfb] border-[1px] border-[#fbfbfb50] bg-[#212121] text-[#fbfbfb]"
                : "text-[#fbfbfb9f] hover:text-[#fbfbfbdf]"
            }`
          }
        >
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `px-[1.25rem] py-[0.5rem] rounded-full text-sm border-1 border-transparent transition-colors ${
              isActive
                ? "text-shadow-[0px_0px_1px] text-shadow-[#fbfbfb] border-[1px] border-[#fbfbfb50] bg-[#212121] text-[#fbfbfb]"
                : "text-[#fbfbfb9f] hover:text-[#fbfbfbdf]"
            }`
          }
        >
          Market
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wallet"
          className={({ isActive }) =>
            `px-[1.25rem] py-[0.5rem] rounded-full text-sm border-1 border-transparent transition-colors ${
              isActive
                ? "text-shadow-[0px_0px_1px] text-shadow-[#fbfbfb] border-[1px] border-[#fbfbfb50] bg-[#212121] text-[#fbfbfb]"
                : "text-[#fbfbfb9f] hover:text-[#fbfbfbdf]"
            }`
          }
        >
          Crypto wallet
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `px-[1.25rem] py-[0.5rem] rounded-full text-sm border-1 border-transparent transition-colors ${
              isActive
                ? "text-shadow-[0px_0px_1px] text-shadow-[#fbfbfb] border-[1px] border-[#fbfbfb50] bg-[#212121] text-[#fbfbfb]"
                : "text-[#fbfbfb9f] hover:text-[#fbfbfbdf]"
            }`
          }
        >
          Watchlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            `px-[1.25rem] py-[0.5rem] rounded-full text-sm border-1 border-transparent transition-colors ${
              isActive
                ? "text-shadow-[0px_0px_1px] text-shadow-[#fbfbfb] border-[1px] border-[#fbfbfb50] bg-[#212121] text-[#fbfbfb]"
                : "text-[#fbfbfb9f] hover:text-[#fbfbfbdf]"
            }`
          }
        >
          Community
        </NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
