import LoginForm from "@/components/pages/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function Page() {
  return <LoginForm />;
}
