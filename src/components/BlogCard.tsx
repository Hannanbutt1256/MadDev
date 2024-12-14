import { BlogCardProps } from "../types/BlogCardProps";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Like icon
import { FaRegCommentDots } from "react-icons/fa"; // Comments icon
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"; // Bookmark icon
import { useState } from "react";
const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  author,
  createdAt,
  tags = [],
  coverImage,
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
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
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Author & Date */}
        <div className="text-gray-500 text-xs flex justify-between">
          <span>By {author}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center text-gray-600 hover:text-red-500 transition"
          >
            {liked ? (
              <AiFillHeart className="w-5 h-5 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-5 h-5" />
            )}
            {/* <span className="ml-1 text-sm">{liked ? "Liked" : "Like"}</span> */}
          </button>

          {/* Comments Button */}
          <button className="flex items-center text-gray-600 hover:text-blue-500 transition">
            <FaRegCommentDots className="w-5 h-5" />
            {/* <span className="ml-1 text-sm">Comments</span> */}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className="flex  items-center text-gray-600 hover:text-yellow-500 transition"
          >
            {bookmarked ? (
              <BsBookmarkFill className="w-5 h-5 text-yellow-500" />
            ) : (
              <BsBookmark className="w-5 h-5" />
            )}
            {/* <span className="ml-1 text-sm">
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
