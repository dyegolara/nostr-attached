import { useQuery, useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { Event, Kind } from "nostr-tools";

import { relay } from "../constants/relay";

const QUERY_KEY = "events";

export function useEvents(options = {}) {
  const queryClient = useQueryClient();
  const filters = [{ kind: Kind.Text }];
  const sub = relay.sub(filters);

  sub.on("event", (event: Event) => {
    queryClient.setQueryData<Event[]>(
      [QUERY_KEY, filters],
      (oldData: Event[] = []) => {
        if (event.kind === Kind.Text) {
          return uniqBy([...oldData, event], "id");
        }
      }
    );
    queryClient.setQueryData<Event>(
      [QUERY_KEY, [{ ids: [event.id] }]],
      () => event
    );
    sub.on("eose", () => {
      sub.unsub();
    });
  });

  return useQuery<Event[]>({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => Promise.resolve([]),
    ...options,
  });
}

export function useEvent(eventId: string, options: any = {}) {
  const queryClient = useQueryClient();
  const filters = [{ ids: [eventId] }];
  const sub = relay.sub(filters);

  sub.on("event", (event: Event) => {
    console.log("event", event);
    queryClient.setQueryData<Event>([QUERY_KEY, filters], () => {
      if (event.kind === Kind.Text) return event;
    });
  });
  sub.on("eose", () => {
    sub.unsub();
  });

  return useQuery<Event>({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => Promise.resolve([]),
    ...options,
  });
}
