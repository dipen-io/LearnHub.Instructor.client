import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your User type (adjust this to your backend model)
interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields if needed
}

// Define the full shape of your store
interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;

  // Actions
  initializeAuth: () => Promise<void>;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
}

// Create the store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isAuthLoading: true,

      async initializeAuth() {
        console.log("initializeAuth")
        const token = get().token;
        if (token) {
          console.log("TOKEN: ", token);
          set({ isLoggedIn: true, isAuthLoading: false });
        } else {
          set({ isLoggedIn: false, isAuthLoading: false });
            console.log("NO TOKEN");
        }

      },

      login: (userData, authToken) =>
        set({ user: userData, token: authToken, isLoggedIn: true, isAuthLoading: false }),

      logout: () => {
        set({ user: null, token: null, isLoggedIn: false, isAuthLoading: false }),
        toast.success("Logout Successfully!");
      }
    }),
    {
      name: "auth-storage", // Key for localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

