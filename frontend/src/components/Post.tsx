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
        <h2 className="card-title">{post?.title}</h2>
        <p>{post?.content}</p>
        <div className="card-actions justify-end">
          <button className="btn">Read more</button>
        </div>
      </div>
    </div>
  );
};
