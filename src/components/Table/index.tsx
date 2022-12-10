import { FC } from 'react'
import {
  Link,
  Table as TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Repository } from '@/hooks/useGitHubRepositories'

type Prop = {
  repositories: Repository[]
}

export const Table: FC<Prop> = ({ repositories }) => {
  return (
    <TableContainer borderRadius=".5rem" mt="1rem">
      <Thead backgroundColor="#F4F6F8">
        <Tr>
          <Th w="50%">Name</Th>
          <Th w="40%">Latest Updated</Th>
          <Th w="10%">Star</Th>
        </Tr>
      </Thead>
      <Tbody>
        {repositories.map(({ id, name, url, updatedAt, stargazersCount }) => {
          const date = new Date(updatedAt)
          const latestUpdated =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          return (
            <Tr key={`repository-${id}`}>
              <Td>
                <Link
                  href={url}
                  target="_blank"
                >
                  {name}
                  <ExternalLinkIcon ml="1rem" />
                </Link>
              </Td>
              <Td>{latestUpdated}</Td>
              <Td>{stargazersCount}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </TableContainer>
  )
}
