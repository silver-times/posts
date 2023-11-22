import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import type { EditPostProps } from "../types/index";

export const EditPost = ({
  id,
  title,
  content,
  setIsEditing,
}: EditPostProps) => {
  const { user } = useAuthContext();
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });

    if (res.ok) {
      toast.success("Post updated successfully!");
    }
    setIsEditing(false);
  };

  return (
    <div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="my-4 block w-1/3 px-4 py-4 bg-white border-2 border-heading rounded-lg text-3xl placeholder-primary focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />

      <textarea
        rows={10}
        name="content"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="edit content..."
        className="my-4 block w-full px-4 py-4 bg-white text-black border-2 border-heading rounded-lg text-xl placeholder-black focus:outline-none focus:border-heading focus:ring-1 focus:ring-heading invalid:border-warning invalid:text-warning focus:invalid:border-warning focus:invalid:ring-warning "
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="my-4 block w-1/6 px-4 py-4 bg-primary hover:bg-heading border-2 border-heading rounded-lg text-2xl text-white "
        >
          Update
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="my-4 block w-1/6 px-4 py-4 bg-primary hover:bg-heading border-2 border-heading rounded-lg text-2xl text-white "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
