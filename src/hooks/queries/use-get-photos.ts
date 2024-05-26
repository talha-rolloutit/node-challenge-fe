import { useQuery } from "@tanstack/react-query";
import { Pet } from "@/types";

export function useGetPhotos() {
  return useQuery({
    queryKey: ["PHOTOS"],
    queryFn: async () => {
      const response = await fetch("http://192.168.1.14:3001/api/photo");
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
