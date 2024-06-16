import { Comment } from "@/types";

export const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div>
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
