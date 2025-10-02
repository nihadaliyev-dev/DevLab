import { memo } from "react";
import { type User, type Notification } from "../../../../types";
import { Bell, BellPlus, Bolt } from "lucide-react";
import { useSettings } from "../../../../contexts/SettingsContext";

interface ProfileAndNotificationsProps {
  user?: User;
  notifications?: Notification[];
}

const defaultUser: User = {
  id: "1",
  fullName: "Nihad Aliyev",
  name: "Nihad",
  surname: "Aliyev",
  status: "online",
  avatar: `https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-svg-download-png-456322.png`,
};

const ProfileAndNotifications = memo<ProfileAndNotificationsProps>(
  ({ user = defaultUser, notifications = [] }) => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    const hasNotifications = notifications.length > 0;
    const { openSettings } = useSettings();

    const handleSettingsToggle = () => {
      openSettings();
    };
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSettingsToggle}
            className="relative p-3 rounded-full bg-[#0E1520]/80 backdrop-blur-sm border border-[#fbfbfb20] text-[#fbfbfb] hover:bg-[#1a2332]/80 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,34,170,0.3)] transition-all duration-200 group"
          >
            <Bolt className="w-5 h-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="relative p-3 rounded-full bg-[#0E1520]/80 backdrop-blur-sm border border-[#fbfbfb20] text-[#fbfbfb] hover:bg-[#1a2332]/80 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,34,170,0.3)] transition-all duration-200 group"
            aria-label={`Notifications ${
              hasNotifications ? `(${unreadCount} unread)` : ""
            }`}
          >
            {hasNotifications ? (
              <Bell className="w-5 h-5" />
            ) : (
              <BellPlus className="w-5 h-5" />
            )}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#0088ff] to-[#00aaff] ring-2 ring-[#0E1520] flex items-center justify-center text-xs font-bold text-white animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          <div className="hidden sm:flex items-center gap-1 text-xs font-light text-[#fbfbfb]/80">
            <span>
              {notifications.length > 0 ? `${notifications.length}+` : "0"}
            </span>
            <span>notification{notifications.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="h-12 w-12 border-2 border-[#fbfbfb] rounded-full overflow-hidden shadow-[0_4px_20px_rgba(0,34,170,0.3)] hover:shadow-[0_6px_25px_rgba(0,34,170,0.4)] transition-all duration-300 hover:scale-105">
              <img
                src={user.avatar}
                alt={`${user.fullName}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0E1520] ${
                user.status === "online"
                  ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  : user.status === "away"
                  ? "bg-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  : "bg-gray-500"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>

          <div className="hidden lg:flex flex-col gap-1">
            <div className="text-sm font-medium text-[#fbfbfb]">
              {user.fullName}
            </div>
            <div
              className={`text-xs font-light rounded-full px-2 py-1 self-start ${
                user.status === "online"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : user.status === "away"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
              }`}
            >
              {user.status}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProfileAndNotifications.displayName = "ProfileAndNotifications";

export default ProfileAndNotifications;
