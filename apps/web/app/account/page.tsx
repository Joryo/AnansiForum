"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMember } from "@repo/schemas";
import { toast } from "react-toastify";

import { useRequireUser } from "@/hooks/requireUser";
import { updateMember } from "@/services/api/Members";
import { UserContext } from "@/contexts/UserContext";
import { UpdateMemberData } from "@/services/api/Members";

export default function PostsNewPage() {
  useRequireUser();
  const { setUser, user } = useContext(UserContext);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMemberData>({
    resolver: zodResolver(UpdateMember),
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("password", undefined);
    }
  }, [user]);

  const onSubmit = (data: UpdateMemberData) => {
    if (!user) return;
    updateMember(user.id, data)
      .then((response) => {
        toast.success("Account updated");
        setUser(response.data);
      })
      .catch(() => {
        toast.error("Failed to update account");
      });
  };

  return (
    <form
      className="flex flex-col gap-6 px-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Email"
        type="email"
        {...register("email")}
        errorMessage={errors.email && (errors.email.message as string)}
        isInvalid={!!errors.email}
      />
      <Input
        label="Name"
        type="text"
        {...register("name")}
        errorMessage={errors.name && (errors.name.message as string)}
        isInvalid={!!errors.name}
      />
      <Input
        label="New password"
        type="password"
        {...register("password")}
        errorMessage={errors.password && (errors.password.message as string)}
        isInvalid={!!errors.password}
      />
      <div className="flex flex-row-reverse">
        <Button className="max-w-32" color="primary" size="lg" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}
