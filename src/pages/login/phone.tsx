import { View, Text, Input } from '@tarojs/components';
import { useState } from 'react';
import BlmButton from '@/components/button';
import './index.scss';

// 电话号码登陆
export default function Phone() {
  const [phone, setPhone] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  // 同意
  const handleAgree = () => {
    setIsAgree(!isAgree);
  };

  // 下一步
  const handleNext = () => {
    console.log('下一步');
  };

  return (
    <>
      <View className="phone__input">
        <View className="phone__input--pre">+86</View>
        <View className="phone__input--line"></View>
        <Input type="number" placeholder="请输入您的出车手机号码"></Input>
      </View>
      <View className="phone__agree">
        <View
          onClick={handleAgree}
          className={`phone__icon ${
            isAgree ? 'phone__icon--agree' : 'phone__icon--disAgree'
          }`}
        ></View>
        <View>
          同意<Text className="phone__text">《隐私协议》</Text>
        </View>
      </View>
      <View className="phone__footer">
        <BlmButton btnClick={handleNext} title="下一步"></BlmButton>
      </View>
    </>
  );
}
