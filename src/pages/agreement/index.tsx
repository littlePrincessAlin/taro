import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function ErrorPage() {
  useLoad(() => {});
  return (
    <View>
      <View>111</View>
    </View>
  );
}
