export interface BlogCommentInterface {
  id: string; // Unique comment ID
  postId: string; // Uniquie postID of post for which the comment is made
  authorId: string;
  content: string;
  createdAt: Date; // Comment creation timestamp
  parentCommentId?: string;
  likes: number;
}
