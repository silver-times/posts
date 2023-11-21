import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useParams } from "react-router-dom";
import { truncateContent } from "../utils/truncateContent";

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const UserPosts = () => {
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [userName, setUserName] = useState<string>("");
  const { user } = useAuthContext();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/user/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });

        if (!res.ok) {
          console.log("Error in fetching user posts");
          return;
        }

        const data = await res.json();
        setUserName(data[0].author.firstName + " " + data[0].author.lastName);
        setUserPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (!userPosts) {
    return <div>Loading user posts...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-4xl text-center mt-4 mb-4">
        All posts by {userName}!
      </h1>
      {userPosts.map((post) => (
        <div
          key={post.id}
          className="card w-[60%] mx-auto py-4 my-4 bg-primary text-primary-content"
        >
          <div className="card-body">
            <h3 className="card-title text-2xl">{post.title}</h3>
            <p className="text-lg">
              on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xl">{truncateContent(post.content || "", 50)}</p>
            <Link to={`/posts/${post.id}`}>
              <button className="btn w-36 mt-2 hover:text-white hover:bg-black">
                Read more
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
