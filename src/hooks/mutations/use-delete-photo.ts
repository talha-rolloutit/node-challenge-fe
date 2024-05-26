import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";

export function useDeletePhoto() {
  return useMutation({
    mutationFn: async (photoId: string) => {
      const response = await fetch(`${API_URL}/api/photo/${photoId}`, {
        method: "DELETE",
      });
      return await response.json();
    },
  });
}
