import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Pagination } from "@nextui-org/pagination";
import * as dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";

import { getComments } from "@/services/api/Comments";
import { Comment } from "@/types";
import { Loading } from "@/components/loading";
import CommentForm from "@/app/posts/[id]/commentForm";

const COMMENT_BY_PAGE = 20;

export default function CommentList({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments(postId, page, COMMENT_BY_PAGE).then((response) => {
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
        {comments.map((comment) => (
          <Card key={`comment-${comment.id}`} className="m-6">
            <CardBody>
              <p>{comment.content}</p>
            </CardBody>
            <CardFooter className="text-sm italic text-default-500">
              <Image
                alt="user avatar"
                height={20}
                radius="sm"
                src={`https://ui-avatars.com/api/?name=${comment.author.name}&background=random`}
                width={20}
              />
              <div className="flex flex-col">
                <p className="ml-2">
                  {comment.author.name} -{" "}
                  {dayjs.default(comment.createdAt).format("L LT")}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </ul>
      {count > 0 && pagination}
      <span id={"bottom-comment-anchor"} />
      <CommentForm postId={postId} onCreate={() => handleNewComment()} />
    </div>
  );
}
