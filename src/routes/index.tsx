import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTheme } from '@/contexts/ThemeContext'
import HeroSection from '@/features/home/HomeSection';
import Loader from '@/components/Loader';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const router = useRouter();
  const { isLoggedIn, isAuthLoading } = useAuthStore();
  if (isAuthLoading) {
    return <Loader />
  }
  if (!isLoggedIn) {
    router.navigate({ to: '/login' })
  }

  // return <Loader />
  const { theme } = useTheme();
  return (
    <div className="text-[var(--color-text)]">
      <h1 className='mb-1'>Staticstics</h1>
      <div className={`h-[0.5px] w-full ${theme == "dark" || theme == "navy" || theme == "midnight" ? "bg-white" : "bg-black"}`}>
      </div>
      <HeroSection />

    </div>
  )
}


