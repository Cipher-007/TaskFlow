import type { Comment, Users } from "~/server/db/schema";

export default function CommentCard({
  user,
  comment,
}: {
  user: Users;
  comment: Comment;
}) {
  return (
    <div>
      <div>{comment.content}</div>
      <div className="flex justify-between pt-2">
        <div className="text-sm font-light">
          {comment.createdAt?.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </div>
        <div className="text-base">{user.name} </div>
      </div>
    </div>
  );
}
