import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useAuthContext();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: "POST",
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
          By <span className="font-bold">Author</span> on{" "}
          {new Date(post?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-2xl">{post?.content}</p>
        <Link to={"/"}>
          <button className="btn w-36 mt-10">Go back</button>
        </Link>
      </div>
    </div>
  );
};
