import { View, Text, Input } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { navigateTo, showToast } from '@tarojs/taro';
import BlmButton from '@/components/button';
import './index.scss';

// 正则
const CALL =
  /^(13[0-9]|17[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
const maxlength = 13;

// 电话号码登陆
export default function Phone(props) {
  const { handlePhone, tenantId } = props || {};
  const [phone, setPhone] = useState('');
  const [showPhone, setShowPhone] = useState('');
  const [isAgree, setIsAgree] = useState(false);

  // 验证手机号
  const checkPhone = (value) => {
    const condition = value.length === maxlength - 2 && !CALL.test(value);
    // 校验
    if (condition) {
      showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    return true;
  };
  // 输入手机号
  const handlePhoneInput = (event) => {
    const { value = '' } = event?.detail || {};
    const numberVal = value.replace(/[^0-9]/g, ''); // 去除非数字元素
    setPhone(numberVal);
    checkPhone(numberVal);
  };
  // 同意
  const handleAgree = () => {
    setIsAgree(!isAgree);
  };
  // 前往隐私协议
  const goAgreement = () => {
    navigateTo({
      url: '/pages/agreement/index',
    });
  };

  // 下一步
  const handleNext = () => {
    if (!phone) {
      showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    if (!isAgree) {
      showToast({
        title: '请同意隐私协议',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    handlePhone(phone);
    navigateTo({
      url: `/pages/identity/index?fromSource=imageCode&mobile=${phone}&tenantId=${tenantId}`,
    });
  };

  useEffect(() => {
    if (!phone.length) {
      setShowPhone('');
      return;
    }
    const first = phone.slice(0, 3).length ? phone.slice(0, 3) : '';
    const second = phone.slice(3, 7).length ? ` ${phone.slice(3, 7)}` : '';
    const third = phone.slice(7, phone.length).length
      ? ` ${phone.slice(7, phone.length)}`
      : '';
    const showValue = `${first}${second}${third}`;
    setShowPhone(showValue);
  }, [phone]);

  return (
    <>
      <View className="phone__input">
        <View className="phone__input--pre">+86</View>
        <View className="phone__input--line"></View>
        <Input
          type="number"
          placeholder="请输入您的出车手机号码"
          maxlength={maxlength}
          value={showPhone}
          onInput={handlePhoneInput}
          adjustPosition={false}
          style={
            phone.length
              ? { color: 'rgba(0, 0, 0, 0.6)', fontSize: '22px' }
              : {}
          }
        ></Input>
      </View>
      <View className="phone__agree">
        <View
          onClick={handleAgree}
          className={`phone__icon ${
            isAgree ? 'phone__icon--agree' : 'phone__icon--disAgree'
          }`}
        ></View>
        <View>
          同意
          <Text className="phone__text" onClick={goAgreement}>
            《隐私协议》
          </Text>
        </View>
      </View>
      <View className="phone__footer">
        <BlmButton btnClick={handleNext} title="下一步"></BlmButton>
      </View>
    </>
  );
}
