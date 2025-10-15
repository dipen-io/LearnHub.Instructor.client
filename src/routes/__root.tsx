import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Menu } from 'lucide-react'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()
({
  component: function RootComponents () {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

   return(
     <>
      <div className="h-[100vh] flex gap-0 justify-start md:px-4 md:py-6
        md:bg-gradient-to-r md:from-green-400 md:to-blue-500">
        {/* Sidebar */}
        <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main content area */}
        <main className="md:h-[95vh] flex-1 bg md:rounded-2xl p-6 text-xl overflow-y-auto">
            <button
                onClick={() => setIsSidebarOpen(true)}
                className='text-[var(--color-text)] md:hidden hover:bg-slate-800' aria-label='Open Menu'
            >
            <Menu size={20} />
            </button>
          <Outlet />
        </main>
        {isSidebarOpen && (
        <div onClick ={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
            > </div>
        )}

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
