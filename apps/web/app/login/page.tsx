"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { UserContext } from "@/contexts/UserContext";
import Api from "@/services/api/Api";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useContext(UserContext);

  const handleLogin = async () => {
    Api.auth(email, password)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        toast.error("Failed to login");
      });
  };

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardHeader className="justify-center">
            <Image
              alt="Anansi forum logo"
              height={100}
              src="/logo-horizontal.png"
              width={100}
            />
          </CardHeader>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Input
              required
              id="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              required
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={() => handleLogin()}>
            Login
          </Button>
          <Link className="text-sm text-center" href="#" prefetch={false}>
            Forgot Password?
          </Link>
        </CardFooter>
      </Card>
      <div className="mt-4">
        <span className="text-sm">{"Don't have an account?"} </span>
        <Link className="text-sm text-blue-500" href="/signup" prefetch={false}>
          Sign up
        </Link>
      </div>
    </>
  );
}
