import { View, CoverImage } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import tabBar from '@/assets/loginBanner.png';
import './index.scss';

export default function ErrorPage() {
  useLoad(() => {
    hideHomeButton();
  });
  return (
    <View className="login">
      <CoverImage src={tabBar} />
      <View className="login__header">
        <View className="login__header--name">约约出行</View>
        <View className="login__header--title">直播培训签到</View>
        <View className="login__header--subTitle">
          请您输入您的出车手机号进行直播签到
        </View>
      </View>
      <View className="login__content">
        <View>请输入您的出车手机号码</View>
        <View>同意《隐私协议》</View>
        <View>下一步</View>
      </View>
    </View>
  );
}
