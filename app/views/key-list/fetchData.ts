import { PAGE_SIZE } from "@/constant/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface IKey {
  id?: string;
  key: string;
  hwid?: string;
  status: string;
  active_time?: string;
  expired_time?: string;
  type: string;
}

export const useFetchData = () => {
  const [keys, setKeys] = useState<IKey[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const getData = async () => {
    const params = new URLSearchParams(searchParams);
    let pageSize = params.get("pageSize") || PAGE_SIZE;
    const data = await fetch(`/api/key${params && `?${params}`}`, {
      method: "GET",
      cache: "no-cache",
    });
    const { keys: res, total } = await data.json();
    setTotalPage(Math.ceil(Number(total) / Number(pageSize)));
    setKeys([...res]);
  };

  return { keys, getData, totalPage };
};
