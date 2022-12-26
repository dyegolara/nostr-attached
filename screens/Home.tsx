import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { sortBy } from "lodash";
import Moment from "moment-timezone";

import { Text } from "../components/Themed";
import { useEvents } from "../hooks/useEvents";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const { data, isLoading } = useEvents({ enabled: false });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1">
      <FlatList
        data={sortBy(data, "created_at").reverse()}
        renderItem={({ item }) => (
          <Pressable
            className="p-4 border-b border-gray-500"
            onPress={() => {
              if (item.id) navigation.navigate("Post", { eventId: item.id });
            }}
          >
            <Text className="text-xs">
              {Moment(item.created_at * 1000).fromNow()}
            </Text>
            <Text className="text-base">{item.content}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
