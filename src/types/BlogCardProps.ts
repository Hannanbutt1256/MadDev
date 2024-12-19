export interface BlogCardProps {
  title: string;
  author: string;
  createdAt: string; // ISO string
  tags?: string[];
  coverImage?: string; // URL of the blog's cover image
}
