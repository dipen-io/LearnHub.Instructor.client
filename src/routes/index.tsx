import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '@/contexts/ThemeContext'
import HeroSection from '@/features/home/HomeSection';
import Loader from '@/components/Loader';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/')({
  component: App,
})



function App() {
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        return <Loader />
    }

    // return <Loader />
  const {theme} = useTheme();
  return (
    <div className="text-[var(--color-text)]">
      <h1 className='mb-1'>Staticstics</h1>
          <div className={`h-[0.5px] w-full ${theme =="dark" || theme =="navy"  || theme =="midnight" ? "bg-white" : "bg-black"}`}>
            </div>
            <HeroSection />

    </div>
  )
}


