import { useQuery } from "@tanstack/react-query";
import { fetchStreamerById } from "../services/fetch-streamer-by-id";

export function useFetchStreamerById(id: string) {
  const query = useQuery({
    queryKey: ["fetch-streamer-by-id"],
    queryFn: () => fetchStreamerById(id),
  });

  return query;
}
