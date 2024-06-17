import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";

import { createComment } from "@/services/api/Comments";

export default function CommentForm({
  postId,
  onCreate,
}: {
  postId: number;
  onCreate: () => void;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    createComment(postId, content)
      .then(() => {
        onCreate();
      })
      .catch((error) => {
        //TODO: Show alert error
        console.error(error);
      });
  };

  return (
    <div className={"m-6"}>
      <Textarea
        label="Write a comment"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-row-reverse">
        <Button
          className="max-w-32 mt-2"
          color="primary"
          size="lg"
          onClick={() => handleSubmit()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
