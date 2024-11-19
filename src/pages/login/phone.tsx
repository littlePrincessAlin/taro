import { View, Text, Input } from '@tarojs/components';
import './index.scss';

// 电话号码登陆
export default function Phone() {
  return (
    <>
      <View className="login__input">
        <Input type="number" placeholder="这是一个数字输入框"></Input>
      </View>
      <View className="login__content--agree">
        <View className="login__content--icon"></View>
        同意
        <Text className="login__content--text">《隐私协议》</Text>
      </View>
      <View className="login__footer">下一步</View>
    </>
  );
}
