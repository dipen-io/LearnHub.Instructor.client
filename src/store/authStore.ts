import { create } from "zustand";
import { persist } from "zustand/middleware"; // Save in LocalStore

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoggedIn: false,
            login: (userData, authToken)=> set ({ user: userData, token: authToken, isLoggedIn: true }),
            logout:() => set({ user: null, token: null, isLoggedIn: false }),
        }),
        {
            name: 'auth-storage', // Name for the item  in localStorage
        }
    )
)
