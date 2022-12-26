import React, { useMemo } from "react";
import { Text, View } from "react-native";
import Moment from "moment-timezone";
import { Event } from "nostr-tools";

export default function Post({ event }: { event: Event }) {
  const timeAgo = useMemo(
    () => Moment(event.created_at * 1000).fromNow(),
    [event.created_at]
  );

  return (
    <View className="bg-white dark:bg-black border-b border-gray-500 p-4">
      <Text className="text-xs dark:text-white mb-2">{timeAgo}</Text>
      <Text className="text-base dark:text-white">{event.content}</Text>
    </View>
  );
}
