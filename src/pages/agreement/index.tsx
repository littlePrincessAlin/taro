import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function Agreement() {
  useLoad(() => {});
  return (
    <View>
      <View>隐私协议</View>
    </View>
  );
}