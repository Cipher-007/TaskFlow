import type { Comment, User } from "@prisma/client";

export default function CommentCard({
  user,
  comment,
}: {
  user: Partial<User>;
  comment: Comment;
}) {
  return (
    <div>
      <div>{comment.content}</div>
      <div className="flex justify-between pt-2">
        <div className="text-sm font-light">
          {comment.createdAt.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </div>
        <div className="text-base">{`~ ${user.firstName} ${user.lastName}`}</div>
      </div>
    </div>
  );
}
