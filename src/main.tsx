import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'
import { startMocking } from './mocks'
import { isMockingEnabled } from './mocks/config'
import { DEV_TOOLS_ENABLED } from './config/devTools'

// Configuration du QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Fonction pour démarrer l'application
const startApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        {DEV_TOOLS_ENABLED && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </StrictMode>,
  )
}

// Démarrer les mocks si activés, puis lancer l'application
if (DEV_TOOLS_ENABLED && isMockingEnabled()) {
  console.log('🔧 MSW mocking enabled');
  startMocking()
    .then(() => {
      console.log('✅ MSW ready');
      startApp();
    })
    .catch((error) => {
      console.error('❌ MSW failed to start:', error);
      startApp();
    });
} else {
  if (DEV_TOOLS_ENABLED) {
    console.log('🌐 Using real API');
  }
  startApp();
}
