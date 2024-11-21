import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';

export default function Task() {
  useLoad(() => {});
  return (
    <View>
      <View></View>
      <View>签到任务详情</View>
    </View>
  );
}
