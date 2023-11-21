import React, { useState } from "react";
import type { PostInput } from "../types/index";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const PostForm: React.FC = () => {
  const { user } = useAuthContext();
  const { setPosts } = usePostContext();
  const [error, setError] = useState<string | null>(null);
  const [inputPost, setInputPost] = useState<PostInput>({
    title: "",
    content: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify({ ...inputPost, authorId: user?.id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      return;
    }

    setPosts((prev) => [json, ...prev]);
    setInputPost({ title: "", content: "" });
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold uppercas text-3xl text-white text-center mt-5">
        Add a new post
      </h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={inputPost.title}
        onChange={handleChange}
        className="my-4 block w-full px-4 py-4 bg-white text-black border-2 border-heading rounded-lg text-xl placeholder-black focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />

      <textarea
        rows={10}
        name="content"
        value={inputPost.content}
        onChange={handleChange}
        placeholder="express yourself..."
        className="my-4 block w-full px-4 py-4 bg-white text-black border-2 border-heading rounded-lg text-xl placeholder-black focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />

      <button
        type="submit"
        className="my-4 block w-full px-4 py-4 bg-primary text-black hover:bg-black hover:text-white border-2 border-heading rounded-lg text-2xl font-medium"
      >
        Post
      </button>
      {error && (
        <p className="text-warning text-xl font-bold uppercase">{error}</p>
      )}
    </form>
  );
};
