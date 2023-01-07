import React from "react";
import { FlatList, Pressable, View } from "react-native";
import Moment from "moment-timezone";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { Event, Kind } from "nostr-tools";

import Post from "../components/Post";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const { events, isLoading } = useNostrEvents({
    filter: {
      kinds: [Kind.Text],
      since: dateToUnix(Moment().subtract(1, "hour").toDate()),
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList<Event>
        data={events}
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
