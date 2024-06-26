"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePost } from "@repo/schemas";

import { useRequireUser } from "@/hooks/requireUser";
import { createPost, CreatePostData } from "@/services/api/Posts";

export default function PostsNewPage() {
  useRequireUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: zodResolver(CreatePost),
  });

  const onSubmit = (data: CreatePostData) => {
    createPost(data)
      .then((post) => {
        router.push(`/posts/${post.data.id}`);
      })
      .catch((error) => {
        //TODO: Show alert error
        console.error(error);
      });
  };

  return (
    <form
      className="flex flex-col gap-6 px-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Title"
        type="text"
        {...register("title")}
        errorMessage={errors.title && (errors.title.message as string)}
        isInvalid={!!errors.title}
      />
      <Textarea
        label="Body"
        {...register("content")}
        errorMessage={errors.content && (errors.content.message as string)}
        isInvalid={!!errors.content}
      />
      <div className="flex flex-row-reverse">
        <Button className="max-w-32" color="primary" size="lg" type={"submit"}>
          Post
        </Button>
      </div>
    </form>
  );
}
