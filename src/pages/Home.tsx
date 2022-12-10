import { FC, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Table, Pagination } from '@/components'
import { useGitHubRepositories } from '@/hooks/useGitHubRepositories'

export const Home: FC = () => {
  const [input, setInput] = useState('')
  const {
    isFetching,
    message,
    repositories,
    totalPages,
    searchStr,
    setSearchStr,
    currentPage,
    setPage,
  } = useGitHubRepositories()

  console.log('message')
  console.log(message)

  return (
    <Flex w="100%" h="100vh" px="3rem" py="2rem" direction="column" gap="1rem">
      <Flex align="center">
        <Box w="40%">
          <Heading as="h2">Search GitHub Repositories</Heading>
        </Box>
        <InputGroup w="60%">
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search repositories"
          />
          <Button ml="1rem" onClick={() => setSearchStr(input)} disabled={isFetching}>Search</Button>
        </InputGroup>
      </Flex>
      {searchStr && repositories.length ? (
        <>
          <Table repositories={repositories} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={setPage}
          />
        </>
      ) : (
        <Flex h={400} justify="center" align="center" fontWeight="bold">
          <Box fontSize="1.5rem" textAlign="center">
            {message
              ? <Text>API rate limit exceeded.<br />Please try again after some time has passed.</Text>
              : <Text>Nothing.<br />Please input a word you want to search or retype different wording.</Text>
            }
          </Box>
        </Flex>
      )}
    </Flex>
  )
}
