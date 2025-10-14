import { createFileRoute } from '@tanstack/react-router'
// import ThemeSwitcher from '@/components/ThemeSwitcher'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-[var(--color-text)]">
      <h1>This is home route</h1>
    </div>
  )
}
