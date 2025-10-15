import { createFileRoute  } from '@tanstack/react-router'
import { useTheme } from '@/contexts/ThemeContext'
import VideoSection from '@/features/video/VideoSection'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/video')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuthStore();
  const {theme} = useTheme()

    console.log("USER:", user);

  return <div className='text-[var(--color-text)]'><p className='mb-1'>Video</p>
    <div className={`h-[0.5px] w-full ${theme =="dark" || theme =="navy"  || theme =="midnight" ? "bg-white" : "bg-black"}`}></div>
    <VideoSection />
  </div>
}
