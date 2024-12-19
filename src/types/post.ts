import { BlogCommentInterface } from "./comment";
export interface BlogPostInterface {
  id: string;
  authorId: string;
  title: string;
  coverImage?: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
  likes: [];
  comments: BlogCommentInterface[];
}
