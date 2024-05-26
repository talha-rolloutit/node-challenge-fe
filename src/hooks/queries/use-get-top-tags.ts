import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";

export function useGetTopTags() {
  return useQuery({
    queryKey: ["TOP_TAGS"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/photo/top-tags`);
      return response.json() as unknown as {
        count: number;
        id: string;
        name: string;
      }[];
    },
  });
}
