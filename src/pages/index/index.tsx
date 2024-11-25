import { View } from '@tarojs/components';
import BlmButton from '@/components/button';
import { navigateTo } from '@tarojs/taro';
import './index.scss';

export default function Index() {
  const goLogin = () => {
    navigateTo({
      url: '/pages/login/index',
    });
  };
  return (
    <View className="home">
      <View className="home__navBar"></View>
      <View className="home__title">欢迎来到「司机培训中心」</View>
      <View className="home__task">
        <BlmButton btnClick={goLogin} title="参加培训"></BlmButton>
      </View>
    </View>
  );
}
