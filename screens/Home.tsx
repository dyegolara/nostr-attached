import React from "react";
import { FlatList, View } from "react-native";
import { sortBy } from "lodash";
import Moment from "moment-timezone";

import { Text } from "../components/Themed";
import usePosts from "../hooks/usePosts";

export default function Home() {
  const { data, isLoading } = usePosts({ enabled: false });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <FlatList
        data={sortBy(data, "created_at").reverse()}
        renderItem={({ item }) => (
          <View className="p-4">
            <Text>{Moment(item.created_at * 1000).fromNow()}</Text>
            <Text className="text-lg">{JSON.stringify(item.content)}</Text>
          </View>
        )}
      />
    </View>
  );
}
