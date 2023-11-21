type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export const Post = ({ post }: { post: Post }) => {
  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title text-5xl">{post?.title}</h2>
        <p className="text-lg">
          By <span className="font-bold">Author</span> on{" "}
          {new Date(post?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-2xl">{post?.content}</p>

        <div className="card-actions justify-end">
          <button className="btn">Read more</button>
        </div>
      </div>
    </div>
  );
};
