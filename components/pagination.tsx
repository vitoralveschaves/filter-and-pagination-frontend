'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  links: {
    url: string,
    label: string,
    active: boolean
  }[]
}

export default function Pagination({ links }: PaginationProps) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()


  const handleClickPage = (pageNumber: number) => {

    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1) {
      params.set('page', pageNumber.toString())
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <PaginationComponent>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link, index) => {


          if (link.label.includes('Anterior') || link.label.includes('Próximo')) {
            return null;
          }

          if (link.label === '...') {
            return (
              <PaginationItem key={index} className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={index} className='cursor-pointer'>
              <PaginationLink onClick={() => handleClickPage(Number(link.label))} isActive={link.active} dangerouslySetInnerHTML={{ __html: link.label }}></PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
