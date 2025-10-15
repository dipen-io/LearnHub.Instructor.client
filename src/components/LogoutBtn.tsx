import { useAuthStore } from "../store/authStore";

export default function LoginButtion() {
    const { isLoggedIn, login, logout } = useAuthStore();

    if (isLoggedIn) {
        return <button onClick={logout} className=" w-48 border border-black  hover:bg-slate-200 py-2 rounded-4xl">Log Out</button>
    }

    // When the user logs in via your API, call the login function from the store
    const handleLogin = () => {
      // ... after successful API call
      const userData = { name: "John Doe" };
      const token = "your_jwt_token";
      login(userData, token);
    };

    return <button onClick={handleLogin} className="w-48 border border-blue-600  hover:bg-slate-200 py-2 rounded-4xl">Log In</button>;
}
