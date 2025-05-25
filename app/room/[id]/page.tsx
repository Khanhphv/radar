import Room from "@/components/pages/room";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

const getData = async (id: string) => {
  const data = await fetch(`${process.env.DOMAIN_URL}/api/room/get?id=${id}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const res = await data.json();
  return res;
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData(id);
  if (data.id) {
    return <Room room={id} />;
  } else {
    return <h2>Link is expired</h2>;
  }
}
