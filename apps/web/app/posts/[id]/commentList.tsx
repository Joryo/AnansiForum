import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Divider } from "@nextui-org/divider";

import { getComments } from "@/services/api/Comments";
import { Comment } from "@/types";
import { Loading } from "@/components/loading";
import CommentForm from "@/app/posts/[id]/commentForm";
import { CommentCard } from "@/components/commentCard";

const COMMENT_BY_PAGE = 20;

export default function CommentList({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments({ limit: COMMENT_BY_PAGE, page, postId }).then((response) => {
      setCount(response.totalCount);
      setComments(response.data);
      setLoading(false);
    });
  }, [page, loading]);

  const handleChangePage = (page: number, scrollToBottom: boolean) => {
    setPage(page);
    setLoading(true);

    scrollToBottom
      ? // @ts-ignore
        document
          .getElementById("bottom-comment-anchor")
          .scrollIntoView({ block: "center", behavior: "smooth" })
      : // @ts-ignore
        document
          .getElementById("comment-anchor")
          .scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const handleNewComment = () => {
    if (
      page === Math.ceil(count / COMMENT_BY_PAGE) &&
      count % COMMENT_BY_PAGE === 0
    ) {
      handleChangePage(page + 1, true);

      return;
    }
    handleChangePage(Math.ceil(count / COMMENT_BY_PAGE), true);
  };

  const pagination = (
    <div className="flex justify-center">
      <Pagination
        showControls
        initialPage={page}
        total={Math.ceil(count / COMMENT_BY_PAGE)}
        onChange={(page) => handleChangePage(page, false)}
      />
    </div>
  );

  if (loading) return <Loading label="Loading comments.. ." />;

  return (
    <div>
      <h2 className="text-lg font-medium ml-6 mr-6 mb-2" id="comment-anchor">
        {count} comment(s)
      </h2>
      <Divider className={"mb-4"} />
      {count > 0 && pagination}
      <ul>
        {comments.map((comment: Comment) => (
          <li key={`comment-${comment.id}`}>
            <CommentCard
              comment={comment}
              highlights={[]}
              onDelete={() => setLoading(true)}
            />
          </li>
        ))}
      </ul>
      {count > 0 && pagination}
      <span id={"bottom-comment-anchor"} />
      <CommentForm postId={postId} onCreate={() => handleNewComment()} />
    </div>
  );
}
