import React from "react";
import { Text, View } from "react-native";
import Moment from "moment-timezone";

import { useEvent } from "../hooks/useEvents";
import { RootStackScreenProps } from "../types";

export default function Post({ route }: RootStackScreenProps<"Post">) {
  const { eventId } = route.params;
  const { data: event, isLoading } = useEvent(eventId);

  console.log(eventId, event, isLoading);

  if (isLoading || !event) return <Text>Loading...</Text>;

  return (
    <View className="flex-1">
      <Text className="text-xs">
        {Moment(event.created_at * 1000).fromNow()}
      </Text>
      <Text className="text-base">{event.content}</Text>
    </View>
  );
}
