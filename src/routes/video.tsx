import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='text-[var(--color-text)]'>Hello Welcome to route "/video"!</div>
}
