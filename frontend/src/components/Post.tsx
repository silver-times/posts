import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
};

const truncateContent = (content: string, limit: number) => {
  const words = content.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return content;
};

export const Post = ({ post }: { post: Post }) => {
  const truncatedContent = truncateContent(post?.content || "", 50);
  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title text-5xl">{post?.title}</h2>
        <p className="text-lg">
          By{" "}
          <span className="font-bold">
            {post.author?.firstName} {post.author?.lastName}
          </span>{" "}
          on {new Date(post?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-2xl">{truncatedContent}</p>

        <div className="card-actions justify-end">
          <Link to={`/posts/${post?.id}`}>
            <button className="btn">Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
