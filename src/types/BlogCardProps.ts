import React from "react";

export interface BlogCardProps {
  title: string;
  author: string | React.ReactNode;
  createdAt: string; // ISO string
  tags?: string[];
  coverImage?: string; // URL of the blog's cover image
}
