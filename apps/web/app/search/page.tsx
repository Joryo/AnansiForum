"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Divider } from "@nextui-org/divider";
import { toast } from "react-toastify";

import { Post } from "@/types";
import { Comment } from "@/types";
import { useRequireUser } from "@/hooks/requireUser";
import { getPosts } from "@/services/api/Posts";
import { getComments } from "@/services/api/Comments";
import { Loading } from "@/components/loading";
import PostCard from "@/components/postCard";
import { CommentCard } from "@/components/commentCard";

export default function Search() {
  useRequireUser();
  // Get query from query params using next/router
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [loadingPost, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPosts({ search: query, limit: 10, page: 1 })
      .then((response) => {
        setPosts(response.data);
        setLoadingPosts(false);
      })
      .catch(() => {
        toast.error("Failed to load posts");
      });

    getComments({ search: query, limit: 10, page: 1 })
      .then((response) => {
        setComments(response.data);
        setLoadingComments(false);
      })
      .catch(() => {
        toast.error("Failed to load comments");
      });
  }, [query]);

  const Posts = () => (
    <>
      <h1>{posts.length} post(s) found</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <PostCard highlights={query.split(" ")} post={post} />
          </li>
        ))}
      </ul>
    </>
  );

  const Comments = () => (
    <>
      <h1>{comments.length} comment(s) found</h1>
      <ul>
        {comments.map((comment: Comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} highlights={query.split(" ")} />
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div>
      {loadingPost ? <Loading label={"Search posts..."} /> : <Posts />}
      <Divider className={"mt-3"} />
      {loadingComments ? (
        <Loading label={"Search comments..."} />
      ) : (
        <Comments />
      )}
    </div>
  );
}
