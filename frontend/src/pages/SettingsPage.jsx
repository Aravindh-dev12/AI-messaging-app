import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="w-full min-h-screen px-4 pt-16 pb-12 mx-auto sm:px-6 md:px-8 max-w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Theme Selector - scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-2 sm:gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  flex-shrink-0 w-16 sm:w-20 md:w-24 
                  group flex flex-col items-center gap-1 p-1.5 sm:p-2 
                  rounded-lg transition-colors
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 sm:h-9 md:h-10 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-0.5 sm:p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
