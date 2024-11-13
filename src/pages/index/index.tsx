import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import Slider from '@/components/slider';
import './index.scss';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
      {Slider()}
    </View>
  );
}
