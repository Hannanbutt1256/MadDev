export interface UserProfileInterface {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  followers: string[];
  following: string[];
}
