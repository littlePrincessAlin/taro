import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function ImageCode() {
  useLoad(() => {});
  return (
    <View>
      <View>图形验证</View>
    </View>
  );
}
