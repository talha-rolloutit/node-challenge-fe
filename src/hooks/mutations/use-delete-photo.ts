import { useMutation } from "@tanstack/react-query";

export function useDeletePhoto() {
  return useMutation({
    mutationFn: async (photoId: string) => {
      const response = await fetch(
        `http://192.168.1.14:3001/api/photo/${photoId}`,
        {
          method: "DELETE",
        }
      );
      return await response.json();
    },
  });
}
