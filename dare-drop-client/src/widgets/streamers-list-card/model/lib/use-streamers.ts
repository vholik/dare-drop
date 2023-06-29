import { useQuery } from "@tanstack/react-query";
import { fetchStreamers } from "../services/fetch-streamers";

export const USE_STREAMERS_QUERY_KEY = "get-streamers";

export function useStreamers() {
  const query = useQuery([USE_STREAMERS_QUERY_KEY], fetchStreamers);

  return query;
}
