import { clsx } from 'clsx'
import { Dispatch, SetStateAction } from 'react'

interface PaginationProps {
  totalPages: number
  nextPage: boolean
  prevPage: boolean
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

function allButtons(totalPages: number) {
  const buttons = []
  for (let i = 0; i < totalPages; i++) {
    buttons.push(i)
  }

  return buttons
}

export function Pagination({
  nextPage,
  prevPage,
  totalPages,
  setPage,
  page,
}: PaginationProps) {
  return (
    <div className="mt-5 flex items-center gap-2">
      {allButtons(totalPages).map((button) => (
        <button
          key={button}
          onClick={() => setPage(button + 1)}
          className={clsx('h-10 w-10 rounded ', {
            'bg-red-500 text-zinc-50': page === button + 1,
            'bg-zinc-300 text-red-500': page !== button + 1,
          })}
        >
          {button + 1}
        </button>
      ))}
    </div>
  )
}
