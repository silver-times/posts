import { useState } from "react";
import { Link } from "react-router-dom";
import { EditPost } from "./EditPost";
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
  const [isEditing, setIsEditing] = useState(false);
  const isCurrentUserAuthor = user?.id === post?.authorId;

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        {isEditing ? (
          <EditPost
            setIsEditing={setIsEditing}
            id={post?.id}
            title={post?.title}
            content={post?.content}
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="card-title text-5xl">{post?.title}</h2>
              <div className="flex gap-4">
                {isCurrentUserAuthor && (
                  <>
                    <button
                      onClick={() => handleEdit()}
                      className="material-symbols-outlined bg-white rounded-full p-1 text-black hover:text-white hover:bg-black  cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete()}
                      className="material-symbols-outlined bg-white rounded-full p-1 text-black hover:text-white hover:bg-black  cursor-pointer"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
