import { usePostContext } from "../hooks/usePostContext";

export const Home = () => {
  const { posts } = usePostContext();

  return (
    <div className="flex container mx-auto gap-8">
      <div className="w-3/4">
        {posts &&
          posts.map((post) => (
            <span key={post.title} className="mb-32">
              <h1 className="text-3xl font-bold">{post.title}</h1>
            </span>
          ))}
      </div>
    </div>
  );
};
