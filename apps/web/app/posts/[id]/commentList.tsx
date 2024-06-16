import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Pagination } from "@nextui-org/pagination";
import * as dayjs from "dayjs";

import { getComments } from "@/services/api/Comments";
import { Comment } from "@/types";

const COMMENT_BY_PAGE = 20;

export const CommentList = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getComments(postId, 1, 10).then((response) => {
      setComments(response.data);
      setCount(response.totalCount);
    });
  }, []);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <Card key={`comment-${comment.id}`} className="m-6 cursor-pointer">
            <Divider />
            <CardBody>
              <p>{comment.content}</p>
            </CardBody>
            <CardFooter className="text-sm italic text-default-500">
              <Image
                alt="user avatar"
                height={40}
                radius="sm"
                src={`https://ui-avatars.com/api/?name=${comment.author.name}&background=random`}
                width={40}
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-medium">{comment.author.name}</h1>
              </div>
              {dayjs.default(comment.createdAt).format("L LT")} -{" "}
            </CardFooter>
          </Card>
        ))}
      </ul>
      <div className="flex justify-center">
        <Pagination
          showControls
          initialPage={page}
          total={Math.ceil(count / COMMENT_BY_PAGE)}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
    </div>
  );
};
