"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  totalElements: number;
  listLength: number;
  page: number;
}

export function Pagination({ totalPages, page }: PaginationProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") ?? "1";

  return (
    <div className="flex w-full justify-end items-center">
      <div className="flex gap-4 items-center">
        <p className="text-muted-foreground text-sm">
          Página {page} de {totalPages}
        </p>
        
        <div className="space-x-1">
          <Button
            variant={"secondary"}
            size={"icon-sm"}
            disabled={page <= 1}
          >
            <Link href={`?page=${page - 1}`}>
              <ChevronLeftIcon />
            </Link>
          </Button>
          <Button
            variant={"secondary"}
            size={"icon-sm"}
            disabled={page === totalPages}
          >
            <Link href={`?page=${page + 1}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}