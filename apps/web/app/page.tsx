"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Pagination } from "@nextui-org/pagination";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import * as dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";

import { Post } from "@/types";
import { useRequireUser } from "@/hooks/requireUser";
import { getPosts } from "@/services/api/Posts";
import { Loading } from "@/components/loading";

dayjs.extend(LocalizedFormat);

const MAX_CONTENT_LENGTH = 100;
const POSTS_BY_PAGE = 20;

export default function LastPosts() {
  useRequireUser();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPosts(page, POSTS_BY_PAGE).then((response) => {
      setCount(response.totalCount);
      setPosts(response.data);
      setLoading(false);
    });
  }, [page]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  if (loading) return <Loading label="Loading last posts..." />;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <Link key={`post-${post.id}`} passHref href={`/posts/${post.id}`}>
            <Card className="m-6 cursor-pointer">
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
                  <p className="text-small text-default-500">
                    {post.author.name}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  {post.content.length < MAX_CONTENT_LENGTH
                    ? post.content
                    : `${post.content.slice(0, MAX_CONTENT_LENGTH)}...`}
                </p>
              </CardBody>
              <Divider />
              <CardFooter className="text-sm italic text-default-500">
                {dayjs.default(post.createdAt).format("L LT")} -{" "}
                {post.comments.length} comment(s)
              </CardFooter>
            </Card>
          </Link>
        ))}
      </ul>
      {count > 0 && (
        <div className="flex justify-center">
          <Pagination
            showControls
            initialPage={page}
            total={Math.ceil(count / POSTS_BY_PAGE)}
            onChange={(page) => handleChangePage(page)}
          />
        </div>
      )}
    </div>
  );
}
