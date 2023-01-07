import React from "react";
import { Text } from "react-native";
import { useNostrEvents } from "nostr-react";

import PostComponent from "../components/Post";
import { RootStackScreenProps } from "../types";

export default function Post({ route }: RootStackScreenProps<"Post">) {
  const { eventId } = route.params;
  const { events, isLoading } = useNostrEvents({ filter: { ids: [eventId] } });

  if (isLoading || !events.length) return <Text>Loading...</Text>;

  return (
    <>
      <PostComponent event={events[0]} />
      {/* Replies */}
    </>
  );
}
