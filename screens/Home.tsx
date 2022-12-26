import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { noop, sortBy } from "lodash";
import Moment from "moment-timezone";

import { Text } from "../components/Themed";
import usePosts from "../hooks/usePosts";

export default function Home() {
  const { data, isLoading } = usePosts({ enabled: false });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1">
      <FlatList
        data={sortBy(data, "created_at").reverse()}
        renderItem={({ item }) => (
          <Pressable className="p-4 border-b border-gray-500" onPress={noop}>
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
