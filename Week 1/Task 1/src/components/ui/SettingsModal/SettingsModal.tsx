import React, { useState } from "react";
import {
  X,
  Layout,
  Sidebar,
  BarChart3,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
} from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";

const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    closeSettings,
    cardConfigs,
    updateCardConfigs,
    navbarLayout,
    setNavbarLayout,
  } = useSettings();

  const [tempCardConfigs, setTempCardConfigs] = useState(cardConfigs);
  const [tempNavbarLayout, setTempNavbarLayout] = useState(navbarLayout);

  // Update temp state when modal opens
  React.useEffect(() => {
    if (isSettingsOpen) {
      setTempCardConfigs(cardConfigs);
      setTempNavbarLayout(navbarLayout);
    }
  }, [isSettingsOpen, cardConfigs, navbarLayout]);

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
    closeSettings();
  };

  const handleReset = () => {
    setTempCardConfigs(cardConfigs);
    setTempNavbarLayout(navbarLayout);
  };

  const handleCancel = () => {
    setTempCardConfigs(cardConfigs);
    setTempNavbarLayout(navbarLayout);
    closeSettings();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
        isSettingsOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleCancel}
      />

      <div
        className={`relative w-full max-w-2xl bg-gradient-to-br from-[#0E1520] to-[#1a2332] border border-[#fbfbfb20] rounded-t-[2rem] shadow-2xl transform transition-all duration-300 ease-out ${
          isSettingsOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#fbfbfb20]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-[#0022aa] to-[#0044cc]">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-[#fbfbfb]">
              Dashboard Settings
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 rounded-full hover:bg-[#fbfbfb20] transition-colors duration-200"
          >
            <X className="w-5 h-5 text-[#fbfbfb]" />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          ``
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#fbfbfb] flex items-center gap-2">
              <Sidebar className="w-5 h-5" />
              Navigation Layout
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTempNavbarLayout("header")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  tempNavbarLayout === "header"
                    ? "border-[#0022aa] bg-[#0022aa20] text-[#fbfbfb]"
                    : "border-[#fbfbfb20] bg-[#fbfbfb10] text-[#fbfbfb80] hover:border-[#fbfbfb40]"
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
                    ? "border-[#0022aa] bg-[#0022aa20] text-[#fbfbfb]"
                    : "border-[#fbfbfb20] bg-[#fbfbfb10] text-[#fbfbfb80] hover:border-[#fbfbfb40]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Sidebar className="w-6 h-6" />
                  <span className="font-medium">Sidebar Layout</span>
                  <span className="text-xs text-center">
                    Navigation on the side
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#fbfbfb] flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Dashboard Cards
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {tempCardConfigs.map((config) => (
                <div
                  key={config.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#fbfbfb10] border border-[#fbfbfb20] hover:bg-[#fbfbfb20] transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0022aa] to-[#0044cc]" />
                    <span className="text-[#fbfbfb] font-medium">
                      {config.name}
                    </span>
                    <span className="text-xs text-[#fbfbfb60] bg-[#fbfbfb10] px-2 py-1 rounded-full">
                      {config.colSpanClass}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCardToggle(config.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      config.visible
                        ? "bg-[#0022aa] text-white hover:bg-[#0033cc]"
                        : "bg-[#fbfbfb20] text-[#fbfbfb60] hover:bg-[#fbfbfb30]"
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
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#fbfbfb20] bg-[#fbfbfb05]">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#fbfbfb80] hover:text-[#fbfbfb] hover:bg-[#fbfbfb20] transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-[#fbfbfb20] text-[#fbfbfb] hover:bg-[#fbfbfb20] transition-all duration-200"
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
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
