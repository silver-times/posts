import { useEffect } from "react";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Post } from "../components/Post";
import { PostForm } from "../components/PostForm";

export const Home = () => {
  const { posts, setPosts } = usePostContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          console.log("Error in fetching posts");
          return;
        }

        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [user, setPosts]);

  return (
    <div className="flex container mx-auto gap-8">
      <div className="w-3/4 flex flex-col mt-8">
        {posts.length > 0 &&
          posts?.map((post) => (
            <span key={post?.id} className="mb-8">
              <Post post={post} />
            </span>
          ))}
      </div>
      <div className="w-1/4">
        <PostForm />
      </div>
    </div>
  );
};
