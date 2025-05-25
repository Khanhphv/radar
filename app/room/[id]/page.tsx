"use client";
import Room from "@/components/pages/room";
import { Metadata } from "next";
import { useEffect, useState } from "react";

const getData = async (id: string) => {
  const data = await fetch(`https://others.atwship.net/api/room/${id}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const res = await data.json();
  return res;
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [roomId, setRoomId] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(id);
      setRoomId(data.id);
    };
    fetchData();
  }, []);

  return <Room room={roomId} />;
}
