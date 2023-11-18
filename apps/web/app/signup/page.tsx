"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMember } from "@repo/schemas";

import { UserContext } from "@/contexts/UserContext";
import { createMember, CreateMemberData } from "@/services/api/Members";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMemberData>({
    resolver: zodResolver(CreateMember),
  });

  const { user } = useContext(UserContext);

  const onSubmit = async (data: CreateMemberData) => {
    createMember(data)
      .then(() => {
        toast.success("Account created, please login");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Failed to signup");
      });
  };

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardHeader className="text-2xl text-center">Signup</CardHeader>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Input
                label="Name"
                type="text"
                {...register("name")}
                errorMessage={errors.name && (errors.name.message as string)}
                isInvalid={!!errors.name}
              />
            </div>
            <div className="space-y-2">
              <Input
                required
                label="Email"
                type="email"
                {...register("email")}
                errorMessage={errors.email && (errors.email.message as string)}
                isInvalid={!!errors.email}
              />
            </div>
            <div className="space-y-2">
              <Input
                required
                id="password"
                label="Password"
                type="password"
                {...register("password")}
                errorMessage={
                  errors.password && (errors.password.message as string)
                }
                isInvalid={!!errors.password}
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" type={"submit"}>
              Signup
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-4">
        <span className="text-sm">{"Already have an account?"} </span>
        <Link className="text-sm text-blue-500" href="/login" prefetch={false}>
          Signin
        </Link>
      </div>
    </>
  );
}
