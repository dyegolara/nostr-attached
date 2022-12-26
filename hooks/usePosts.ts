import { useQuery } from "@tanstack/react-query";

export default function usePosts() {
  return useQuery({
    queryKey: ["/api/posts"],
    queryFn: ({ queryKey }) => fetch(queryKey[0]).then((res) => res.json()),
  });
}
