import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useCallback } from 'react'

interface PaginationCustomProps {
  currentPage?: number
  totalPages?: number
  onPageChange: (page: number) => void
}

const PaginationCustom = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: PaginationCustomProps) => {
  // Function to handle page click
  const handlePageClick = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages && page !== currentPage) {
        onPageChange(page)
      }
    },
    [currentPage, totalPages, onPageChange],
  )

  return (
    <Pagination className="mt-2">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              to="#"
              onClick={() => handlePageClick(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1
          return (
            <PaginationItem
              key={page}
              className={`cursor-pointer ${
                page === currentPage ? 'bg-primary rounded-md' : ''
              }`}>
              <PaginationLink to="#" onClick={() => handlePageClick(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              to="#"
              onClick={() => handlePageClick(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom
