import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function Live() {
  useLoad(() => {});
  return (
    <View>
      <View>直播直播</View>
    </View>
  );
}
