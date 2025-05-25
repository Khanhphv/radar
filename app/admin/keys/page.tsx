import { KeyList } from "@/app/views/key-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keys",
  description: "Keys",
};

export default async function Page() {
  return <KeyList />;
}
