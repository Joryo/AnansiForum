"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "@/contexts/UserContext";
import Api from "@/services/api/Api";

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
      .catch((error) => {
        console.error(error);
      });
  };

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardHeader className="text-2xl text-center">Login</CardHeader>
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
        <span className="text-sm">Don't have an account? </span>
        <Link className="text-sm text-blue-500" href="#" prefetch={false}>
          Sign up
        </Link>
      </div>
    </>
  );
}
