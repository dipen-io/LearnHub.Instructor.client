import { createFileRoute, useMatchRoute, Outlet, redirect } from '@tanstack/react-router';
import { useSearch } from '@tanstack/react-router';
import { useTheme } from '@/contexts/ThemeContext';
import VideoSection from '@/features/video/VideoSection';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/course')({
  component: VideoComponent,
});

export default function VideoComponent() {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuthStore();
  const {title} = useSearch("title");

    if (!isLoggedIn){
        return redirect("/login")
    }
  // Check if we are on a video detail route (i.e. `/course/:id`)
  const matchRoute = useMatchRoute();
  const isDetailPage = matchRoute({ to: '/course/$id', fuzzy: true });

  return (
    <div className="text-[var(--color-text)]">
      <p className="mb-1">Course {title ? ` >  ${title}` : ""}   </p>
      <div
        className={`h-[0.5px] w-full ${
          theme === 'dark' || theme === 'navy' || theme === 'midnight' ? 'bg-white' : 'bg-black'
        }`}
      />

      {/* Show VideoSection only for the list page, not for the details page */}
      {!isDetailPage && <VideoSection />}

      {/* Render the Outlet (for dynamic routes like /course/:id) */}
      <Outlet />
    </div>
  );
}

