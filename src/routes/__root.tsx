import { Outlet, useRouter, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Sidebar from '@/components/Sidebar'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import Loader from '@/components/Loader'

import type { QueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

interface MyRouterContext {
  queryClient: QueryClient
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: function RootComponent() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { initializeAuth, user, isLoggedIn, isAuthLoading } = useAuthStore()
    const router = useRouter()
    const currentPath = router.state.location.pathname

    if (user) {
      console.log("USER : ", user);
    }

    // Initialize auth state on mount
    useEffect(() => {
      initializeAuth()
    }, [initializeAuth])

    useEffect(() => {
      if (isAuthLoading) return;
      if (currentPath === '/login') return
      if (!isLoggedIn) {
        router.navigate({ to: '/login' })
      }
    }, [isLoggedIn, currentPath, router, isAuthLoading])

    if (isAuthLoading) {
        return (
           <div>
             <Loader />
           </div>
        )
     }

    // Public route (login)
    if (currentPath === '/login') {
      return (
        <main className="flex items-center justify-center">
          <Outlet />
        </main>
      )
    }

    return (
      <>
        <div
          className="h-[100vh] flex gap-0 justify-start md:px-4 md:py-6
          md:bg-gradient-to-r md:from-green-400 md:to-blue-500"
        >
          {/* Sidebar */}
            { isLoggedIn ? (
               <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            ):null}

          {/* Main content area */}
          <main
            className="md:h-[95vh] flex-1 bg md:rounded-2xl md:p-6 p-2 text-xl overflow-y-auto"
          >
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-[var(--color-text)] md:hidden hover:bg-slate-800"
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
            <Outlet />
          </main>

          {/* Overlay on mobile */}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
          )}

          {/* Devtools */}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </div>
      </>
    )
  },
})

