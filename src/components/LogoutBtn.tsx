import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { LogInIcon, LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginButtion() {
    const { isLoggedIn, logout } = useAuthStore();

    if (isLoggedIn) {
    return (
        <Link
            to="/login"
            className="w-44  rounded-4xl"
                onClick={logout}
        >
        <span className="flex gap-3 px-3 hover:bg-slate-200 py-3 rounded-l-4xl">
            <LogOutIcon size={20} />
            Log Out
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
