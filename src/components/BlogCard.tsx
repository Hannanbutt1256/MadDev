import { BlogCardProps } from "../types/BlogCardProps";

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  author,
  createdAt,
  tags = [],
  coverImage,
}) => {
  return (
    <div className="max-w-sm bg-white dark:bg-dark-card  rounded-lg shadow-md overflow-hidden">
      {/* Cover Image */}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="h-48 w-full object-cover"
        />
      )}

      {/* Blog Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-2 truncate">
          {title}
        </h2>

        {/* Description */}
        {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p> */}

        {/* Author & Date */}
        <div className="text-gray-500 dark:text-dark-text text-xs flex justify-between">
          <span>By {author}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-light-button text-light-background dark:bg-dark-button dark:text-dark-text px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {/* <div className="mt-4 flex items-center justify-between"> */}
        {/* Like Button */}
        {/* <button
            onClick={handleLike}
            className="flex items-center text-gray-600 dark:text-dark-text hover:text-red-500 transition"
          >
            {liked ? (
              <AiFillHeart className="w-5 h-5 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-5 h-5" />
            )}
            <span className="ml-1 text-sm">{liked ? "Liked" : "Like"}</span>
          </button> */}

        {/* Comments Button */}
        {/* <button className="flex items-center text-gray-600 dark:text-dark-text hover:text-blue-500 transition">
            <FaRegCommentDots className="w-5 h-5" /> */}
        {/* <span className="ml-1 text-sm">Comments</span> */}
        {/* </button> */}

        {/* Bookmark Button */}
        {/* <button
            onClick={handleBookmark}
            className="flex  items-center text-gray-600 dark:text-dark-text hover:text-yellow-500 transition"
          >
            {bookmarked ? (
              <BsBookmarkFill className="w-5 h-5 text-yellow-500" />
            ) : (
              <BsBookmark className="w-5 h-5" />
            )} */}
        {/* <span className="ml-1 text-sm">
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </span> */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default BlogCard;
