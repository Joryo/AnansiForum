"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import * as dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";

import { Post } from "@/types";
import { useRequireUser } from "@/hooks/requireUser";
import { deletePost, getPost } from "@/services/api/Posts";
import { Loading } from "@/components/loading";
import CommentList from "@/app/posts/[id]/commentList";

dayjs.extend(LocalizedFormat);

export default function LastPosts() {
  const user = useRequireUser();
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const { id } = params;

    if (id) {
      getPost(id.toString())
        .then((response) => {
          setPost(response.data);
        })
        .catch(() => {
          toast.error("Failed to load post");
        });
    }
  }, []);

  const handleDelete = () => {
    if (!post) return;
    deletePost(post.id.toString())
      .then(() => {
        toast.success("Post deleted");
        router.push("/");
      })
      .catch(() => {
        toast.error("Failed to delete post");
      });
  };

  if (!post) return <Loading label="Loading post..." />;

  return (
    <div>
      <Card key={post.id} className="m-6">
        <CardHeader className="flex gap-3">
          <Image
            alt="user avatar"
            height={40}
            radius="sm"
            src={`https://ui-avatars.com/api/?name=${post.author.name}&background=random`}
            width={40}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-medium">{post.title}</h1>
            <p className="text-small text-default-500">{post.author.name}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{post.content}</p>
        </CardBody>
        <Divider />
        <CardFooter className="text-sm italic text-default-500">
          <div className="flex gap-2 justify-between w-full">
            <span>{dayjs.default(post.createdAt).format("L LT")}</span>
            {user && post.author.id === user.id && (
              <Button
                color={"danger"}
                size={"sm"}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <CommentList postId={parseInt(post.id)} />
    </div>
  );
}
