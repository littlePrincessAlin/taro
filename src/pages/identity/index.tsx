import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function Identity() {
  useLoad(() => {});
  return (
    <View>
      <View>验证</View>
    </View>
  );
}
