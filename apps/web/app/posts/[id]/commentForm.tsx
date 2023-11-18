import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateComment } from "@repo/schemas";
import { toast } from "react-toastify";

import { createComment } from "@/services/api/Comments";
import { CreateCommentData } from "@/services/api/Comments";

export default function CommentForm({
  postId,
  onCreate,
}: {
  postId: number;
  onCreate: () => void;
}) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentData>({
    resolver: zodResolver(CreateComment),
  });

  setValue("post.id", postId);

  const onSubmit = (data: CreateCommentData) => {
    createComment(data)
      .then(() => {
        toast.success("Comment created");
        onCreate();
      })
      .catch(() => {
        toast.error("Failed to create comment");
      });
  };

  return (
    <form className={"m-6"} onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        label="Write a comment"
        {...register("content")}
        errorMessage={errors.content && (errors.content.message as string)}
        isInvalid={!!errors.content}
      />
      <div className="flex flex-row-reverse">
        <Button
          className="max-w-32 mt-2"
          color="primary"
          size="lg"
          type={"submit"}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
