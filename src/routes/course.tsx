/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// eslint-disable-next-line import/no-duplicates
import { Outlet, createFileRoute, redirect, useMatchRoute } from '@tanstack/react-router';
// eslint-disable-next-line import/no-duplicates
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import AddCourse from '@/components/AddCourse';
import CourseSection from '@/features/video/CourseSection';

export const Route = createFileRoute('/course')({
  component: VideoComponent,
});

export default function VideoComponent() {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuthStore();
  const { title } = useSearch("title");
  const [isAddCourseOpen, setIsCourseOpen] = useState(false);

  if (!isLoggedIn) {
    return redirect("/login");
  }

  // Check if we are on a video detail route
  const matchRoute = useMatchRoute();
  const isDetailPage = matchRoute({ to: '/course/$id', fuzzy: true });

  // ADD COURSE
  const handleAddCourse = () => {
    setIsCourseOpen(prev => !prev);
  };

  return (
    <div className="text-[var(--color-text)] relative">
      {/* Header */}
      <div className={`transition-all duration-300 ${isAddCourseOpen ? 'hidden' : ''}`}>
        <span className="flex gap-4 mb-1">
          <p>Course {title ? ` >  ${title}` : ""}</p>
          <span
            className="rounded px-2 hover:text-white border-t-2 font-bold hover:border-t-amber-800
                cursor-pointer"
            onClick={handleAddCourse}
          >
            + Add Course
          </span>
        </span>

        <div
          className={`h-[0.5px] w-full ${['dark', 'navy', 'midnight'].includes(theme) ? 'bg-white' : 'bg-black'
            }`}
        />
      </div>

      {/* Content section */}
      <div className={`${isAddCourseOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

        {!isDetailPage && <CourseSection />}
        <Outlet />
      </div>

      {/* AddCourse form (shown only when active) */}
      {isAddCourseOpen && (
        <div className="absolute inset-0 bg-[var(--color-bg)] z-10">
          <AddCourse onClose={() => setIsCourseOpen(false)} />
        </div>
      )}
    </div>
  );
}