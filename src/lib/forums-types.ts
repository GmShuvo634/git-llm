export type ForumAuthUser = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  fullName: string;
};

export type ForumCommentView = {
  id: string;
  author: string;
  text: string;
  time: string;
};

export type ForumPostView = {
  id: string;
  title: string;
  author: string;
  category: string;
  body: string;
  time: string;
  status: "PENDING" | "PUBLISHED";
  comments: ForumCommentView[];
};
