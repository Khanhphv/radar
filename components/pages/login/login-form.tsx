"use client";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/button";
import { login } from "./login";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTES, ROUTES } from "@/constant/routes";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);
      await login({
        username: formData.get("username"),
        password: formData.get("password"),
      });
      router.push(ADMIN_ROUTES.keys);
    } catch (error) {
      toast({
        description: "Please try again!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <form className="p-5" action={onSubmit}>
        <Input
          required
          className="my-3"
          name="username"
          type="text"
          placeholder="Username"
        />
        <Input
          className="my-3"
          required
          name="password"
          type="password"
          placeholder="Password"
        />
        <ButtonLoading loading={loading} variant="default" type="submit">
          Login
        </ButtonLoading>
      </form>
    </div>
  );
}
