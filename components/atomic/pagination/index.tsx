import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { query } from "firebase/database";
// import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/constant/pagination";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface IPagination {
  totalPage?: number;
}
export const KPagination = (props: IPagination) => {
  const { totalPage = 10 } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = searchParams.get("pageSize") || PAGE_SIZE;

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      params.set("pageSize", pageSize);
      return `${pathname}?${params.toString()}`;
    },
    [pageSize, pathname, searchParams]
  );

  return (
    <>
      <Pagination className="my-3">
        <PaginationContent>
          {/* <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem> */}
          {totalPage &&
            Array(totalPage)
              .fill(0)
              .map((_, i: number) => {
                const index = i + 1;
                return (
                  <PaginationItem key={i}>
                    <Link
                      className={buttonVariants({
                        variant: currentPage === index ? "outline" : "ghost",
                        size: "icon",
                      })}
                      href={createPageURL(index)}
                    >
                      {index}
                    </Link>
                    {/* <PaginationLink
                      href={createPageURL(index)}
                      isActive={currentPage === index}
                    >
                      {index}
                    </PaginationLink> */}
                  </PaginationItem>
                );
              })}
        </PaginationContent>
      </Pagination>
    </>
  );
};
