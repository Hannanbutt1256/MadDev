import { BlogCommentInterface } from "./comment";
export interface BlogPostInterface {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  comments: BlogCommentInterface[];
}
