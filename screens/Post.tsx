import React from "react";
import { Text } from "react-native";

import PostComponent from "../components/Post";
import { useEvent } from "../hooks/useEvents";
import { RootStackScreenProps } from "../types";

export default function Post({ route }: RootStackScreenProps<"Post">) {
  const { eventId } = route.params;
  const { data: event, isLoading } = useEvent(eventId);

  if (isLoading || !event) return <Text>Loading...</Text>;

  return (
    <>
      <PostComponent event={event} />
      {/* Replies */}
    </>
  );
}
