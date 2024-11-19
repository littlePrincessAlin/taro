import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import './index.scss';

export default function IdentityCode() {
  useLoad(() => {});
  return (
    <View>
      <View>身份信息验证</View>
    </View>
  );
}
