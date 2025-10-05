import React from "react";
import { useSettings } from "../../hooks/useSettings";
import {
  BarChart3,
  Sidebar as SidebarIcon,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
} from "lucide-react";

const Settings: React.FC = () => {
  const { cardConfigs, updateCardConfigs, navbarLayout, setNavbarLayout } =
    useSettings();

  const [tempCardConfigs, setTempCardConfigs] = React.useState(cardConfigs);
  const [tempNavbarLayout, setTempNavbarLayout] = React.useState(navbarLayout);

  React.useEffect(() => {
    setTempCardConfigs(cardConfigs);
  }, [cardConfigs]);

  React.useEffect(() => {
    setTempNavbarLayout(navbarLayout);
  }, [navbarLayout]);

  const handleCardToggle = (cardId: string) => {
    setTempCardConfigs((prev) =>
      prev.map((config) =>
        config.id === cardId ? { ...config, visible: !config.visible } : config
      )
    );
  };

  const handleSave = () => {
    updateCardConfigs(tempCardConfigs);
    setNavbarLayout(tempNavbarLayout);
  };

  const handleReset = () => {
    setTempCardConfigs(cardConfigs);
    setTempNavbarLayout(navbarLayout);
  };

  const handleCancel = () => {
    setTempCardConfigs(cardConfigs);
    setTempNavbarLayout(navbarLayout);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-[#fbfbfb]">
          Settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-[#fbfbfb80]">
          Customize your dashboard preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm dark:border-[#fbfbfb20] dark:bg-[#0E1520]/60">
          <h2 className="text-lg font-medium text-gray-900 dark:text-[#fbfbfb] flex items-center gap-2">
            <SidebarIcon className="w-5 h-5" />
            Navigation Layout
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTempNavbarLayout("header")}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                tempNavbarLayout === "header"
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-[#0022aa] dark:bg-[#0022aa20] dark:text-[#fbfbfb]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-[#fbfbfb20] dark:bg-[#fbfbfb10] dark:text-[#fbfbfb80] dark:hover:border-[#fbfbfb40]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                <span className="font-medium">Header Layout</span>
                <span className="text-xs text-center">
                  Navigation at the top
                </span>
              </div>
            </button>
            <button
              onClick={() => setTempNavbarLayout("sidebar")}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                tempNavbarLayout === "sidebar"
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-[#0022aa] dark:bg-[#0022aa20] dark:text-[#fbfbfb]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-[#fbfbfb20] dark:bg-[#fbfbfb10] dark:text-[#fbfbfb80] dark:hover:border-[#fbfbfb40]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <SidebarIcon className="w-6 h-6" />
                <span className="font-medium">Sidebar Layout</span>
                <span className="text-xs text-center">
                  Navigation on the side
                </span>
              </div>
            </button>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm dark:border-[#fbfbfb20] dark:bg-[#0E1520]/60">
          <h2 className="text-lg font-medium text-gray-900 dark:text-[#fbfbfb] flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Dashboard Cards
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {tempCardConfigs.map((config) => (
              <div
                key={config.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 dark:bg-[#fbfbfb10] dark:border-[#fbfbfb20] dark:hover:bg-[#fbfbfb20]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0022aa] to-[#0044cc]" />
                  <span className="text-gray-900 dark:text-[#fbfbfb] font-medium">
                    {config.name}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full dark:text-[#fbfbfb60] dark:bg-[#fbfbfb10]">
                    {config.colSpanClass}
                  </span>
                </div>
                <button
                  onClick={() => handleCardToggle(config.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    config.visible
                      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-[#0022aa] dark:hover:bg-[#0033cc]"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-[#fbfbfb20] dark:text-[#fbfbfb60] dark:hover:bg-[#fbfbfb30]"
                  }`}
                >
                  {config.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between p-4 md:p-6 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#fbfbfb20] dark:bg-[#fbfbfb05]">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 dark:text-[#fbfbfb80] dark:hover:text-[#fbfbfb] dark:hover:bg-[#fbfbfb20]"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-all duration-200 dark:border-[#fbfbfb20] dark:text-[#fbfbfb] dark:hover:bg-[#fbfbfb20]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#0022aa] to-[#0044cc] text-white hover:from-[#0033cc] hover:to-[#0055ee] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
