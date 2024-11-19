import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function ScanFail() {
  useLoad(() => {
    hideHomeButton();
  });
  return (
    <View className="scanFail">
      <View>sss</View>
      <View className="scanFail__navBar"></View>
    </View>
  );
}
