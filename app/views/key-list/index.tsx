"use client";

import ButtonGenKey from "@/components/molecules/keys/button-gen-key";

import { KPagination } from "@/components/atomic/pagination";
import { useFetchData } from "./fetchData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/molecules/datatable/datatable";
import { useKeyColumns } from "@/components/molecules/keys/columns";
import { useSorting } from "@/components/molecules/datatable/useSorting";
import { useEffect, useState } from "react";

export const KeyList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { sorting, onSortingChange, order, field } = useSorting();
  const { getData, keys, totalPage } = useFetchData();
  const { columns: keyColumns } = useKeyColumns({ callback: getData });

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (field) {
      params.set("order", order);
      params.set("field", field);
    } else {
      params.delete("order");
      params.delete("field");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [sorting, order, field, searchParams, pathname, router]);

  useEffect(() => {
    getData();
  }, [searchParams]);

  console.log(keys);

  return (
    <div className="p-3 w-full h-full">
      <hr className="my-2" />
      <ButtonGenKey onGen={getData} />
      <DataTable
        sorting={sorting}
        onSortingChange={onSortingChange}
        data={keys}
        columns={keyColumns}
      />
      <KPagination totalPage={totalPage} />
    </div>
  );
};
