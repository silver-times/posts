import React, { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const PostContext = createContext<PostContextType>({
  posts: [],
  setPosts: () => {},
});

interface ChildrenProps {
  children: React.ReactNode;
}

const PostContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetching posts");
      console.log(user?.accessToken);
      try {
        const res = await fetch("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          console.log("Error in fetching posts");
          return;
        }
        setPosts(data);
        console.log("cottect");
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [user, setPosts]);
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
