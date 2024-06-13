"use client";
import { useState, useEffect } from "react";

import { useRequireUser } from "@/hooks/requireUser";
import { getPosts } from "@/services/api/Posts";

export default function LastSubjects() {
  useRequireUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
