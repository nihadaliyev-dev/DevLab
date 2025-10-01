import { memo } from "react";
import { MdNotifications, MdNotificationsNone } from "react-icons/md";
import { type User, type Notification } from "../../../../types";

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

    return (
      <div className="flex items-center gap-[1rem]">
        <div className="flex items-center gap-[0.5rem]">
          <div>
            <button
              className="cursor-pointer relative rounded-full bg-[#0E1520] text-[#fbfbfb] p-[0.75rem] text-md hover:bg-[#1a2332] transition-colors"
              aria-label={`Notifications ${
                hasNotifications ? `(${unreadCount} unread)` : ""
              }`}
            >
              {hasNotifications ? <MdNotifications /> : <MdNotificationsNone />}
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-[0.5rem] h-[0.5rem] rounded-full bg-[#0088ff] ring-2 ring-[#000022]"></span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-[0.1rem] text-sm font-light dark:text-[#fbfbfb] text-[#212121]">
            <span>
              {notifications.length > 0 ? `${notifications.length}+` : "0"}
            </span>
            <p>notification{notifications.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-[3.3rem] w-[3.3rem] border-[0.2rem] border-[#fbfbfb] rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={`${user.fullName}'s avatar`}
              className="rounded-full w-full h-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-col px-[0.5rem] gap-[0.1rem] justify-center">
            <div className="text-sm font-normal dark:text-[#fbfbfb] text-[#212121]">
              {user.fullName}
            </div>
            <div
              className={`text-[11px] font-light rounded-full px-[0.4rem] self-baseline ${
                user.status === "online"
                  ? "bg-green-500/20 text-green-400"
                  : user.status === "away"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-gray-500/20 text-gray-400"
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
