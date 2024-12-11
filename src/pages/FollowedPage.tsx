import ListUser from "../components/ListUser";
import { UserProfileInterface } from "../types/user";
import BlogCard from "../components/BlogCard";
const FollowedPage = () => {
  // const { userfollowing, isUserFollowing } = useState(false);
  const isUserFollowing = (user: UserProfileInterface): boolean => {
    return user.following.length === 0;
  };
  return (
    <>
      {!isUserFollowing && <ListUser />}
      <div className="min-h-screen flex flex-col items-center md:block   ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-4">
          <BlogCard
            key={"1"}
            title={"React 18 Features You Should Know"}
            description={"An overview of the exciting features in React 18."}
            author={"John Doe"}
            createdAt={"2024-12-01T12:00:00Z"}
            tags={["React", "JavaScript", "Web Development"]}
            coverImage={"https://picsum.photos/200/300"}
          />
        </div>
      </div>
    </>
  );
};

export default FollowedPage;
