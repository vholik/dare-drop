import { useQuery } from "@tanstack/react-query";
import { fetchStreamers } from "../services/fetch-streamers";

export function useStreamers() {
  const query = useQuery({
    queryKey: ["get-streamers"],
    queryFn: fetchStreamers,
  });

  return query;
}
