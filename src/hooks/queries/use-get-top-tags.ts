import { useQuery } from "@tanstack/react-query";
import { Pet } from "@/types";

export function useGetTopTags() {
  return useQuery({
    queryKey: ["TOP_TAGS"],
    queryFn: async () => {
      const response = await fetch(
        `http://192.168.1.14:3001/api/photo/top-tags`
      );
      return response.json() as unknown as {
        count: number;
        id: string;
        name: string;
      }[];
    },
  });
}
