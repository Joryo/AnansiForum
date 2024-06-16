"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useRequireUser } from "@/hooks/requireUser";
import { createPost } from "@/services/api/Posts";

export default function PostsNewPage() {
  useRequireUser();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    createPost(title, content)
      .then((post) => {
        router.push(`/posts/${post.data.id}`);
      })
      .catch((error) => {
        //TODO: Show alert error
        console.error(error);
      });
  };

  return (
    <>
      <Input
        label="Title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea label="Body" onChange={(e) => setContent(e.target.value)} />
      <div className="flex flex-row-reverse">
        <Button
          className="max-w-32"
          color="primary"
          size="lg"
          onClick={() => handleSubmit()}
        >
          Post
        </Button>
      </div>
    </>
  );
}
