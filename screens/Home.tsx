import React, { useEffect } from "react";
import { FlatList, Pressable, View } from "react-native";
import { sortBy } from "lodash";
import Moment from "moment-timezone";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { Event, Kind } from "nostr-tools";

import Post from "../components/Post";
import { Text } from "../components/Themed";
import { useEvents } from "../hooks/useEvents";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const { data, isLoading } = useEvents();
  const { events, unsubscribe } = useNostrEvents({
    filter: {
      kinds: [Kind.Text],
      since: dateToUnix(Moment().subtract(1, "hour").toDate()),
    },
  });

  useEffect(() => {
    // Stop subscribing when component unmounts:
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList<Event>
        data={sortBy(events, "created_at").reverse()}
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
