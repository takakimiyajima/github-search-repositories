import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export type Repository = {
  id: number
  name: string
  stargazersCount: number
  url: string
  updatedAt: string
}

type GitHubSearch = {
  message?: string
  total_count: number
  items: {
    id: number
    name: string
    stargazers_count: number
    html_url: string
    updated_at: string
  }[]
}

export const PER_PAGE = 10

export const useGitHubRepositories = () => {
  const [searchStr, setSearchStr] = useState<string>("")
  const [searchedItem, setSearchedItem] = useState<GitHubSearch>(undefined)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setPage(() => 1)
  }, [searchStr])

  const fetchGitHub = async (searchStr: string, page: number) => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${searchStr}&page=${page}&per_page=${PER_PAGE}`,
      {
        headers: {
          Authorization: "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",
        },
      }
    )
    return res.json()
  }

  const { isFetching } = useQuery<GitHubSearch>(
    ["GitHubSearch", searchStr, page],
    () => fetchGitHub(searchStr, page),
    {
      retry: 0,
      keepPreviousData: true,
      onSuccess: setSearchedItem,
      onError: () => setSearchedItem(undefined),
    }
  )

  const changeRepositoryProp = (): Repository[] => {
    return (
      searchedItem?.items?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          updatedAt: item.updated_at,
          stargazersCount: item.stargazers_count,
          url: item.html_url,
        }
      }) ?? []
    )
  }

  return {
    isFetching,
    message: searchedItem?.message,
    repositories: changeRepositoryProp(),
    totalPages: Math.ceil(searchedItem?.total_count / PER_PAGE),
    searchStr,
    setSearchStr,
    currentPage: page,
    setPage,
    perPage: PER_PAGE,
  }
}
