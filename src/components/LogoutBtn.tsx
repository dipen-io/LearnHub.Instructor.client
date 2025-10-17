import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import Loader2 from "./Loader2";
import Loader from "./Loader";

export default function LoginButtion() {
    const { isLoggedIn, logout } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Optional: simulate async logout if it's synchronous
    await new Promise(resolve => setTimeout(resolve, 800));

    logout();
    setIsLoggingOut(false);
  };

    if (isLoggedIn) {
    return (
        <Link
            to="/login"
            className="w-44 rounded-4xl"
                onClick={handleLogout}
        >
        <span className="flex gap-3 px-3 pl-4 hover:bg-black hover:text-white py-3 rounded-l-4xl">
           {isLoggingOut ? (
                <>
                  <div className='w-8'>
                    <Loader2 />
                  </div>
                </>
                ) : (
                  <>
                    <LogOutIcon size={20} />
                    Log Out
                  </>
               )}
             </span>
         </Link>
       )
     }

    return (
        <Link
            to="/login"
            className="w-44  rounded-4xl"
        >
        <span className="flex gap-3 px-3 hover:bg-slate-200 py-3 rounded-l-4xl">
            <LogInIcon size={20} />
            Log In
        </span>
        </Link>
    )
}
