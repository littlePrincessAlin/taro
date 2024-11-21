import { View } from '@tarojs/components';
import BlmButton from '@/components/button';
import './index.scss';

export default function Index() {
  return (
    <View className="home">
      <View className="home__navBar"></View>
      <View className="home__title">欢迎来到「司机培训中心」</View>
      <View className="home__task">
        <BlmButton title="参加培训"></BlmButton>
      </View>
    </View>
  );
}
