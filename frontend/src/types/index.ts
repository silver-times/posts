export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export type PostInput = {
  title: string;
  content: string;
};

export type EditPostProps = {
  id: string;
  title: string;
  content: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export interface ChildrenProps {
  children: React.ReactNode;
}
