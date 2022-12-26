import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { sortBy } from "lodash";
import { Event } from "nostr-tools";

import Post from "../components/Post";
import { Text } from "../components/Themed";
import { useEvents } from "../hooks/useEvents";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const { data, isLoading } = useEvents({ enabled: false });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList<Event>
        data={sortBy(data, "created_at").reverse()}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (item.id) navigation.navigate("Post", { eventId: item.id });
            }}
          >
            <Post event={item} />
          </Pressable>
        )}
      />
    </View>
  );
}
