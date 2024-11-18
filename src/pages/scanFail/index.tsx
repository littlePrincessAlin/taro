import { View, CoverImage } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import tabBar from '@/assets/navBar.png';
import './index.scss';

export default function ErrorPage() {
  useLoad(() => {
    hideHomeButton();
  });
  return (
    <View>
      <View>sss</View>
      <CoverImage src={tabBar} />
    </View>
  );
}
