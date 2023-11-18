import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import * as dayjs from "dayjs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { highlightsSearchesTerms } from "@/services/text";
import { Comment } from "@/types";
import { deleteComment } from "@/services/api/Comments";
import { useRequireUser } from "@/hooks/requireUser";
import { MemberRoles } from "@repo/schemas";
import { useDisclosure } from "@nextui-org/modal";
import ConfirmModal from "@/components/confirmModal";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    if (!onDelete) return;
    deleteComment(comment.id)
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
    <>
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
            {user &&
              (comment.author.id === user.id ||
                user.role === MemberRoles.ADMIN) &&
              onDelete && (
                <Button color={"danger"} size={"sm"} onClick={onOpen}>
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
      <ConfirmModal
        onConfirm={() => handleDelete()}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        message={"Do you really want delete this comment forever ?"}
        title={"Delete confirmation"}
      />
    </>
  );
}
