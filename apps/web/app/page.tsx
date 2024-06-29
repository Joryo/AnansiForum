"use client";

import { Pagination } from "@nextui-org/pagination";
import * as dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Post } from "@/types";
import { useRequireUser } from "@/hooks/requireUser";
import { getPosts } from "@/services/api/Posts";
import { Loading } from "@/components/loading";
import PostCard from "@/components/postCard";

dayjs.extend(LocalizedFormat);

const POSTS_BY_PAGE = 20;

export default function LastPosts() {
  useRequireUser();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPosts({ page, limit: POSTS_BY_PAGE, orderBy: "createdAt" })
      .then((response) => {
        setCount(response.totalCount);
        setPosts(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load posts");
      });
  }, [page]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  if (loading) return <Loading label="Loading last posts..." />;

  return (
    <div>
      <ul>
        {posts.map((post: Post) => (
          <li key={`post-${post.id}`}>
            <Link passHref href={`/posts/${post.id}`}>
              <PostCard highlights={[]} post={post} />
            </Link>
          </li>
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
