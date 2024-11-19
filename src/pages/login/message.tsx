import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function Message() {
  useLoad(() => {});
  return (
    <View>
      <View>短信验证</View>
    </View>
  );
}
