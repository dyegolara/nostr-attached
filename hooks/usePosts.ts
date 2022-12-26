import { useQuery, useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { Event } from "nostr-tools";
import { Kind } from "nostr-tools/event";

import { relay } from "../constants/relay";

const FILTERS = [{ kind: Kind.Text }];

export default function usePosts(options = {}) {
  const queryClient = useQueryClient();
  const sub = relay.sub(FILTERS);

  sub.on("event", (event: Event) => {
    queryClient.setQueryData<Event[]>(FILTERS, (oldData: Event[] = []) => {
      if (event.kind === Kind.Text) {
        return uniqBy([...oldData, event], "id");
      }
    });
  });
  sub.on("eose", () => {
    sub.unsub();
  });

  return useQuery<Event[]>({
    queryKey: FILTERS,
    queryFn: () => Promise.resolve([]),
    ...options,
  });
}
