import { createFileRoute, useParams } from '@tanstack/react-router'
export const Route = createFileRoute('/course/$id')({
  component: RouteComponent,
})

function RouteComponent() {
   const { id } = useParams({ from: '/course/$id' });
   return <div>Hello `/course/{id}`!</div>
}
