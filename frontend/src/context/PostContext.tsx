import React, { createContext, useState } from "react";
import type { Post, PostContextType, ChildrenProps } from "../types/index";

export const PostContext = createContext<PostContextType>({
  posts: [],
  setPosts: () => {},
});

const PostContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
