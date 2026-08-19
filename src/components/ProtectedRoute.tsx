import { useRouter } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoute({ children }): { children: React.ReactNode }) {
    const { isLoggedIn, isAuthLoading, initializeAuth} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth])

    useEffect(() => {
        if (!isAuthLoading && !isLoggedIn) {
            router.navigate({to: "/login"});
        }
    }, [isLoggedIn, router, isAuthLoading]);

    //Dont render anything until check nums
    if (!isLoggedIn) return null;
    return <> { children } </>;
}
