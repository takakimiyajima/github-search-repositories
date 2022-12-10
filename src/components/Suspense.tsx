import { FC, ReactNode, Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import {
  Box,
  Button,
} from '@chakra-ui/react'

type SuspenseProp = {
  children: ReactNode
}

export const ErrorResetBoundary: FC<SuspenseProp> = ({ children }) => {
  return (
    <Box h="100vh">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <Box>
                There was an error!
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </Box>
            )}
          >
            <Suspense
              fallback={
                <Box
                  h={400}
                  textAlign="center"
                  alignItems="center"
                  fontWeight="bold"
                >
                  Loading...
                </Box>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
      )}
      </QueryErrorResetBoundary>
    </Box>
  )
}
