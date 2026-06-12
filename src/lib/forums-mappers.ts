import type { ForumComment, ForumPost, ForumUser } from "@prisma/client";
import type { ForumCommentView, ForumPostView } from "@/lib/forums-types";

function relativeTime(input: Date) {
  const seconds = Math.floor((Date.now() - input.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

type CommentWithAuthor = ForumComment & { author: ForumUser };
type PostWithAuthorAndComments = ForumPost & {
  author: ForumUser;
  comments: CommentWithAuthor[];
};

export function toForumCommentView(comment: CommentWithAuthor): ForumCommentView {
  return {
    id: comment.id,
    author: comment.author.username,
    text: comment.text,
    time: relativeTime(comment.createdAt),
  };
}

export function toForumPostView(post: PostWithAuthorAndComments): ForumPostView {
  return {
    id: post.id,
    title: post.title,
    author: post.author.username,
    category: post.category,
    body: post.body,
    time: relativeTime(post.createdAt),
    status: post.status,
    comments: post.comments
      .slice()
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map(toForumCommentView),
  };
}
