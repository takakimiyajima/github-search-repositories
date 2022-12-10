import { FC } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from '@/pages/Home'
import { ErrorResetBoundary } from '@/components/Suspense'
import { theme } from '@/styles/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

const App: FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS>
          <ErrorResetBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </ErrorResetBoundary>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
