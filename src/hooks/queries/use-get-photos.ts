import { useQuery } from "@tanstack/react-query";
import { Pet } from "@/types";
import { API_URL } from "@/lib/utils";

export function useGetPhotos({
  page = 1,
  limit = 10,
  tagId = "",
}: {
  page?: number;
  limit?: number;
  tagId?: string;
}) {
  return useQuery({
    queryKey: ["PHOTOS", page, limit, tagId],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/api/photo?page=${page}&limit=${limit}&tagId=${tagId}`
      );
      return response.json() as unknown as {
        data: Pet[];
        meta: {
          limit: number;
          total: number;
        };
      };
    },
  });
}
