export interface BlogCommentInterface {
  id: string; // Unique comment ID
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date; // Comment creation timestamp
  parentCommentId?: string;
  likes: number;
}
