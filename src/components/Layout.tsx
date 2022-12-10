import { FC, ReactNode } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <Flex minH="100vh" w="full" flexDirection="column">
      <Box w="full" h="4rem">
        <Heading as="h2" size="md">
          {title}
        </Heading>
      </Box>
      <Box w="full" flexGrow="1">
        {children}
      </Box>
    </Flex>
  )
}
