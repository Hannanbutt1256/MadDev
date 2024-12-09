export interface UserProfileInterface {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  followers: string[];
  following: string[];
  bookmarkedPosts: string[];
}
