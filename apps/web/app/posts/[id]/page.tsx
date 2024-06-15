"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import * as dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import { Post } from "@/types";
import { useRequireUser } from "@/hooks/requireUser";
import { getPost } from "@/services/api/Posts";

dayjs.extend(LocalizedFormat)

export default function LastPosts() {
  useRequireUser();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const { id } = params;
    if (id) {
      getPost(id.toString()).then((post) => {
        setPost(post);
      });
    }
  }, []);

  if (!post) return <div>Loading...</div>;

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
          <p>
            {post.content}
          </p>
        </CardBody>
        <Divider />
        <CardFooter className="text-sm italic text-default-500">
          {dayjs.default(post.createdAt).format("L LT")}
        </CardFooter>
      </Card>
    </div>
  );
}
