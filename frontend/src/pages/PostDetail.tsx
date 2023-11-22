import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import type { Post } from "../types/index";

export const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useAuthContext();
  const [post, setPost] = useState<Post | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          console.log("Error in fetching post");
          return;
        }

        setUserName(data.author.firstName + " " + data.author.lastName);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card w-[80%] mx-auto py-10 my-10 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title text-5xl">{post?.title}</h2>
        <p className="text-lg">
          By{" "}
          <Link to={`/posts/user/${post.authorId}`}>
            <span className="font-bold hover:text-white">{userName}</span>
          </Link>{" "}
          {""}
          on {new Date(post?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-2xl">{post?.content}</p>
        <Link to={"/"}>
          <button className="btn w-36 mt-10 border-0 text-white hover:text-black hover:bg-theme">
            Go home
          </button>
        </Link>
      </div>
    </div>
  );
};
