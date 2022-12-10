import { FC, useState, useEffect, ReactElement } from "react"
import { Button, HStack } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { makePaginationButtons } from "./utils/makePaginationButtons"

type Props = {
  totalPages: number
  currentPage: number
  setPage: (value: number) => void
}

export const Pagination: FC<Props> = ({ totalPages, currentPage, setPage }) => {
  const [pagination, setPagination] = useState<ReactElement[]>([])

  useEffect(() => {
    const paginationElms = makePaginationButtons(
      totalPages,
      currentPage,
      setPage
    )
    setPagination(paginationElms)
  }, [totalPages, currentPage, setPage])

  return (
    <HStack spacing="4" justifyContent="center">
      <Button
        key={'pagination-arrowBackIcon'}
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowBackIcon />
      </Button>
      {pagination}
      <Button
        key={'pagination-arrowForwardIcon'}
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowForwardIcon />
      </Button>
    </HStack>
  )
}
