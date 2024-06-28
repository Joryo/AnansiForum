import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import * as dayjs from "dayjs";
import { Button } from "@nextui-org/button";
// @ts-ignore
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { highlightsSearchesTerms } from "@/services/text";
import { Comment } from "@/types";
import { deleteComment } from "@/services/api/Comments";
import { useRequireUser } from "@/hooks/requireUser";

const MAX_CONTENT_LENGTH = 300;

export function CommentCard({
  comment,
  highlights,
  onDelete,
}: {
  comment: Comment;
  highlights: string[];
  onDelete?: () => void;
}) {
  const user = useRequireUser();
  const router = useRouter();
  const content = highlightsSearchesTerms(
    comment.content,
    highlights,
    MAX_CONTENT_LENGTH,
  );

  const handleDelete = (commentId: string) => {
    if (!onDelete) return;
    deleteComment(commentId)
      .then(() => {
        toast.success("Comment deleted");
        onDelete();
      })
      .catch(() => {
        toast.error("Failed to delete comment");
      });
  };

  const handleGoToPost = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <Card key={`comment-${comment.id}`} className="m-6">
      <CardBody>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardBody>
      <CardFooter className="text-sm italic text-default-500">
        <div className="flex gap-2 justify-between w-full">
          <div className="flex w-full">
            <Image
              alt="user avatar"
              height={20}
              radius="sm"
              src={`https://ui-avatars.com/api/?name=${comment.author.name}&background=random`}
              width={20}
            />
            <p className="ml-2">
              {comment.author.name} -{" "}
              {dayjs.default(comment.createdAt).format("L LT")}
            </p>
          </div>
          {user && comment.author.id === user.id && onDelete && (
            <Button
              color={"danger"}
              size={"sm"}
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </Button>
          )}
          {!onDelete && (
            <Button
              color={"secondary"}
              size={"sm"}
              onClick={() => handleGoToPost(comment.post.id)}
            >
              See original post
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
