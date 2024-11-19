import { View } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [isAgree, setIsAgree] = useState([1]);

  // 选择同意
  const handleClick = () => {
    setIsAgree([0]);
  };
  useLoad(() => {
    hideHomeButton();
  });
  return (
    <View className="login">
      <View className="login__navBar"></View>
      <View className="login__header">
        <View className="login__header--name">约约出行</View>
        <View className="login__header--title">直播培训签到</View>
        <View className="login__header--subTitle">
          请您输入您的出车手机号进行直播签到
        </View>
      </View>
      <View className="login__content"></View>
    </View>
  );
}
