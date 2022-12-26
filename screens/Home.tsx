import React from "react";
import { FlatList, View } from "react-native";

import { Text } from "../components/Themed";
import usePosts from "../hooks/usePosts";

export default function Home() {
  const { data, isLoading } = usePosts({ enabled: false });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Home Ewe</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text className="p-4">
            {item.created_at}
            {item.content}
          </Text>
        )}
      />
    </View>
  );
}
