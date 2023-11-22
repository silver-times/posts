import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const usePostActions = () => {
  const { user } = useAuthContext();

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const json = await res.json();
      toast.success(json.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (
    postId: string,
    newTitle: string,
    newContent: string
  ) => {
    try {
      const res = await fetch(`http://localhost:5000/posts/${postId}`, {
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
    } catch (err) {
      console.error(err);
    }
  };

  return { handleDelete, handleUpdate };
};
