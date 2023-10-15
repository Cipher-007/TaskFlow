import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import CommentCard from "./comment-card";
import NewComment from "./new-comment";

async function getData(projectId: string) {
  const comments = await db.comment.findMany({
    where: {
      projectId,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    },
  });
  return comments;
}

export default async function ListComment({
  projectId,
}: {
  projectId: string;
}) {
  const comments = await getData(projectId);
  return (
    <Card className="h-fit max-h-[57rem] w-1/5 overflow-y-auto">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="py-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard user={comment.user} comment={comment} />
            <Separator />
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-center">
        <NewComment />
      </CardFooter>
    </Card>
  );
}
