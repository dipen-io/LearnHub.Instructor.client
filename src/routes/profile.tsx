import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuthStore();
    console.log("USER", user);
    return <div>Hello "/profile"! {user?.fullName} {user?.email}</div>
}
