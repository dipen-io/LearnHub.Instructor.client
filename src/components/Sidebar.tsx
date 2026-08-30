import { Link, useMatchRoute } from "@tanstack/react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import { Home, Video, Settings, X, CircleAlert, User } from "lucide-react";
import LoginButtion from "./LogoutBtn";
import { useAuthStore } from "@/store/authStore";

interface SidebarProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const matchRoute = useMatchRoute();
  const { user } = useAuthStore();

  const navItems = [
    { Icons: Home, label: "Home", to: "/" },
    { Icons: Video, label: "Course", to: "/course" },
    { Icons: Settings, label: "Setting", to: "/setting" },
    { Icons: CircleAlert, label: "Instructor", to: "/request-instructor" },
    { Icons: User, label: "Profile", to: "/profile" }
  ];

  console.log("user.role", user?.role);
  // here i want to add that or want to add an condition that 
  // if user.role == "user" then only i want to show the Instructor tab 
  // just tell me how can i hide or enable it here 

  return (
    <>
      <div
        className={`
bg-green-600
        text-blue-200 md:text-black font-semibold  p-4 h-full
        fixed top-0 left-0 w-64 z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:w-52 md:bg-transparent md:p-0
      `}>
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-bold text-gray-700">COURSEHUB</h1>
          <span className="ml-2 bg-slate-700 md:hidden" onClick={() => setIsOpen(false)}>< X /></span>
        </div>
        <nav className="text-lg py-5 space-y-1">
          {navItems.map(({ label, Icons, to }) => {
            if (label === "instructor" && user?.role !== "user") {
              return null;
            }
            const isActive = matchRoute({ to, fuzzy: false });
            return (
              <Link
                key={to}
                to={to}
                className={`font-stretch-extra-expanded block px-4 py-3 relative font-medium transition-all duration-200 ${isActive
                  ? "bg-black text-white rounded-l-full"
                  : "hover:rounded-l-full hover:bg-gray-200"
                  }`}
              >
                <div className="flex gap-3 items-center" onClick={() => setIsOpen(false)}>
                  <Icons size={20} />
                  {label}

                </div>
              </Link>
            );
          })}
        </nav>
        <LoginButtion />
        <div className="absolute left-5 bottom-5">
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
