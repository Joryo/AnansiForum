import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import * as dayjs from "dayjs";
// @ts-ignore

import { Post } from "@/types";
import { highlightsSearchesTerms } from "@/services/text";

dayjs.extend(LocalizedFormat);

const MAX_CONTENT_LENGTH = 300;

export default function PostCard({
  post,
  highlights: highlights = [],
}: {
  post: Post;
  highlights: string[];
}) {
  // Don't remove sanitizeHtml without removing dangerousSetInnerHTML on jsx render
  let content = highlightsSearchesTerms(
    post.content,
    highlights,
    MAX_CONTENT_LENGTH,
  );
  let title = highlightsSearchesTerms(
    post.title,
    highlights,
    MAX_CONTENT_LENGTH,
  );

  return (
    <Card className="m-6 cursor-pointer">
      <CardHeader className="flex gap-3">
        <Image
          alt="user avatar"
          height={40}
          radius="sm"
          src={`https://ui-avatars.com/api/?name=${post.author.name}&background=random`}
          width={40}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-medium">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
          <p className="text-small text-default-500">{post.author.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardBody>
      <Divider />
      <CardFooter className="text-sm italic text-default-500">
        {dayjs.default(post.createdAt).format("L LT")} - {post.comments.length}{" "}
        comment(s)
      </CardFooter>
    </Card>
  );
}
