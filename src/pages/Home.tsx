import { FC } from "react";
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Table, Pagination } from "@/components";
import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";

export const Home: FC = () => {
  const {
    repositories,
    totalPages,
    searchStr,
    setSearchStr,
    currentPage,
    setPage,
  } = useGitHubRepositories()

  return (
    <Flex h="100vh" px="3rem" py="2rem" direction="column" gap="1rem">
      <Flex align="center">
        <Box w="40%">
          <Heading as="h2">Search GitHub Repositories</Heading>
        </Box>
        <InputGroup w="60%">
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input
            type="text"
            placeholder="Search repositories"
            onBlur={(e) => setSearchStr(e.target.value)}
          />
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
          <Text fontSize="1.5rem">Nothing. Input words you want to search</Text>
        </Flex>
      )}
    </Flex>
  );
};
