import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 bg-base-100 hover:bg-base-200 transition-colors text-sm font-medium shadow-sm";

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chat</h1>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 relative">
            {/* Settings Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className={buttonClass}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-base-100 shadow-lg border border-base-300 rounded-lg p-4 z-50">
                  <h2 className="text-sm font-semibold mb-3">Theme</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {THEMES.map((t) => (
                      <button
                        key={t}
                        className={`group flex flex-col items-center gap-2 p-2 rounded-lg border border-base-300 transition-colors
                          ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                        `}
                        onClick={() => setTheme(t)}
                      >
                        <div
                          className="relative h-8 w-full rounded-md overflow-hidden"
                          data-theme={t}
                        >
                          <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                            <div className="rounded bg-primary"></div>
                            <div className="rounded bg-secondary"></div>
                            <div className="rounded bg-accent"></div>
                            <div className="rounded bg-neutral"></div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium truncate w-full text-center">
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile & Logout */}
            {authUser && (
              <>
                <Link to="/profile" className={buttonClass}>
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button onClick={logout} className={buttonClass}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
