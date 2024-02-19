import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import CommentCard from "./comment-card";
import NewComment from "./new-comment";

export default async function ListComment({
  projectId,
}: {
  projectId: string;
}) {
  const comments = await api.commment.getByProjectId.query({ projectId });
  return (
    <Card className="h-fit max-h-[57rem] w-1/5 overflow-y-auto">
      <CardHeader className="p-4">
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
