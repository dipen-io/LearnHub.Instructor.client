import { Link, useMatchRoute } from "@tanstack/react-router";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Sidebar() {
  const matchRoute = useMatchRoute();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Video", to: "/video" },
    { label: "Setting", to: "/setting" },
  ];

  return (
    <div className="w-52 mt-4 relative">
      <h1 className="text-3xl font-bold text-gray-700">COURSEHUB</h1>
      <nav className="text-lg py-5 space-y-1 relative">
        {navItems.map(({ label, to }) => {
          const isActive = matchRoute({ to, fuzzy: false });
          return (
            <Link
              key={to}
              to={to}
              className={`font-stretch-extra-expanded block px-4 py-3 relative font-medium transition-all duration-200 ${
                isActive
                  ? "bg text-[var(--color-text)] rounded-l-full"
                  : "text-white hover:bg-green-500 hover:rounded-l-full"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute left-10 bottom-0">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
