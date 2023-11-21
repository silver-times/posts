import React, { createContext, useState } from "react";

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

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
