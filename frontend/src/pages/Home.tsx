import { useState, useEffect } from "react";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { SinglePostCard } from "../components/SinglePostCard";
import { PostForm } from "../components/PostForm";

export const Home = () => {
  const { user } = useAuthContext();
  const { posts, setPosts } = usePostContext();
  const [searchTerm, setSearchTerm] = useState("");

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
  }, [user, setPosts, searchTerm]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex container mx-auto gap-8">
      <div className="w-2/3 flex flex-col mt-8">
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search among posts or titles below..."
            className="my-4 block w-full px-4 py-4 bg-white text-black border-2 border-heading rounded-lg text-xl placeholder-black focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
          />
        </div>
        {filteredPosts.length > 0 ? (
          filteredPosts?.map((post) => (
            <span key={post?.id} className="mb-8">
              <SinglePostCard post={post} />
            </span>
          ))
        ) : (
          <div className="text-center text-2xl">Sorry, no posts found!</div>
        )}
      </div>
      <div className="w-1/3">
        <PostForm />
      </div>
    </div>
  );
};
