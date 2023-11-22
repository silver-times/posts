import { Link } from "react-router-dom";
import type { Post } from "../types/index";
import { useAuthContext } from "../hooks/useAuthContext";
import { truncateContent } from "../utils/truncateContent";

export const SinglePostCard = ({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: (postId: string) => void;
}) => {
  const { user } = useAuthContext();
  const truncatedContent = truncateContent(post?.content || "", 50);

  const isCurrentUserAuthor = user?.id === post?.authorId;

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title text-5xl">{post?.title}</h2>
        <p className="text-lg">
          By{" "}
          <Link to={`/posts/user/${post.authorId}`}>
            <span className="font-bold hover:text-white">
              {post.author?.firstName} {post.author?.lastName}
            </span>{" "}
          </Link>
          on {new Date(post?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-2xl">{truncatedContent}</p>

        <div className="card-actions justify-end">
          <Link to={`/posts/${post?.id}`}>
            <button className="btn hover:text-white hover:bg-black">
              Read more
            </button>
          </Link>

          {isCurrentUserAuthor && (
            <>
              <Link to={`/posts/edit/${post?.id}`}>
                <button className="btn hover:text-white hover:bg-black">
                  Edit
                </button>
              </Link>

              <button
                className="btn hover:text-white hover:bg-black"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
