import {  View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text >Home Ewe</Text>
      <EditScreenInfo />
    </View>
  );
}
