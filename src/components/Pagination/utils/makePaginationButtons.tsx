import { FC, ReactElement } from 'react'
import { Button, Text } from '@chakra-ui/react'

const Ellipsis: FC = () => <Text>&hellip;</Text>

export const makePaginationButtons = (
  totalCount: number,
  currentPage: number,
  setPage: (value: number) => void,
) => {
  const displayPages: number[] = []
  const pagination: ReactElement[] = []

  // Adding the first and last Page
  // 
  for (let i = 1; i <= totalCount; i++) {
    if (
      i === 1 ||
      i === totalCount ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      displayPages.push(i)
    }
  }

  let previousPage: number

  displayPages.forEach((page) => {
    if (page - previousPage === 2) {
      pagination.push(
        <Button
          key={`pagination-${previousPage + 1}`}
          disabled={previousPage + 1 === currentPage}
          onClick={() => previousPage + 1}
        >
          {previousPage + 1}
        </Button>
      )
    } else if (page - previousPage > 2) {
      pagination.push(<Ellipsis key={`pagination-ellipsis-${page}`}/>)
    } 

    pagination.push(
      <Button
        key={`pagination-${page}`}
        onClick={() => setPage(page)}
        disabled={currentPage === page}
      >
        {page}
      </Button>
    )

    previousPage = page
  })


  return pagination
}