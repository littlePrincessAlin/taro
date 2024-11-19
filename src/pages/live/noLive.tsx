import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function NoLive() {
  useLoad(() => {});
  return (
    <View>
      <View>无直播培训</View>
    </View>
  );
}
