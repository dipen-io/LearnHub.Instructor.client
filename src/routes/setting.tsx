import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '@/contexts/ThemeContext'

export const Route = createFileRoute('/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  const {theme} = useTheme()
  return <div className='text-[var(--color-text)]'>
    <p className='mb-1'>Settings</p>
    <div className={`h-[0.5px] w-full ${theme == "dark" || theme == "navy" || theme == "midnight" ? "bg-white" : "bg-black"}`}></div>

  </div>
}
