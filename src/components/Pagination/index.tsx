import { FC, useState, useEffect, ReactElement } from "react"
import { HStack } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { makePaginationButtons } from "./utils/makePaginationButtons"

type Props = {
  totalPages: number
  currentPage: number
  setPage: (value: number) => void
}

export const Pagination: FC<Props> = ({ totalPages, currentPage, setPage }) => {
  const [pagination, setPagination] = useState<ReactElement[]>([])

  console.log('totalPages')
  console.log(totalPages)

  useEffect(() => {
    const paginationElms = makePaginationButtons(
      totalPages,
      currentPage,
      setPage
    )
    setPagination(paginationElms)
  }, [totalPages, currentPage, setPage])

  console.log("totalPages")
  console.log(totalPages)

  return (
    <HStack spacing="4" justifyContent="center">
      {/* <Button
        onClick={() => {}}
        disabled={currentPage === 1}
      >
        <ArrowBackIcon />
      </Button> */}
      {pagination}
      {/* <Button onClick={() => {}}><ArrowForwardIcon /></Button> */}
    </HStack>
  )
}
