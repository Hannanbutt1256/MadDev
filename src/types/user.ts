export interface UserProfileInterface {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  isFollowing?: boolean;
  followers: string[];
  following: string[];
  bookmarkedPosts: string[];
}
