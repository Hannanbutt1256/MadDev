import ListUser from "../components/ListUser";
import { UserProfileInterface } from "../types/user";
const FollowedPage = () => {
  // const { userfollowing, isUserFollowing } = useState(false);
  const isUserFollowing = (user: UserProfileInterface): boolean => {
    return user.following.length === 0;
  };
  return (
    <>
      {!isUserFollowing && <ListUser />}
      <div></div>
    </>
  );
};

export default FollowedPage;
