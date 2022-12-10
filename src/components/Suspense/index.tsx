import { FC, ReactNode, Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import {
  Box,
  Button,
  Flex,
  Spinner,
} from '@chakra-ui/react'

type SuspenseProp = {
  children: ReactNode
}

export const ErrorResetBoundary: FC<SuspenseProp> = ({ children }) => {
  return (
    <Flex h="100vh" w="100%" justify="center" align="center">
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
                  <Spinner w={30} h={30} />
                </Box>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
      )}
      </QueryErrorResetBoundary>
    </Flex>
  )
}
