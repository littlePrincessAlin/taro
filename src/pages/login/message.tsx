import { View, Input } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import BlmButton from '@/components/button';
import './index.scss';

const maxlength = 4;
let timer;

export default function Message() {
  const [countDown, setCountDown] = useState(30);
  const [messageCode, setMessageCode] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  // 确定
  const handleConfirm = () => {};

  // 输入验证码
  const handleInput = (event) => {
    const { value = '' } = event?.detail || {};
    const numberVal = value.replace(/[^0-9]/g, ''); // 去除非数字元素
    setMessageCode(numberVal);
  };
  const onFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const goIdentity = () => {
    navigateTo({
      url: '/pages/identity/index?fromSource=identityCode',
    });
  };

  useEffect(() => {
    if (!countDown) {
      clearTimeout(timer);
      timer = null;
      return;
    }
    timer = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);
  }, [countDown]);

  return (
    <View className="message">
      <View className="message__content">
        <View className="message__content--input">
          <Input
            style={{ height: '0', width: '0', margin: '0' }}
            type="number"
            value={messageCode}
            maxlength={maxlength}
            focus={isFocus}
            onInput={handleInput}
            onBlur={handleBlur}
            adjustPosition={false}
          ></Input>
          <View onTap={onFocus} className="message__content--item">
            {messageCode[0]}
          </View>
          <View onTap={onFocus} className="message__content--item">
            {messageCode[1]}
          </View>
          <View onTap={onFocus} className="message__content--item">
            {messageCode[2]}
          </View>
          <View onTap={onFocus} className="message__content--item">
            {messageCode[3]}
          </View>
        </View>
        <View className="message__content--count">{countDown}s 后重新获取</View>
      </View>
      <View className="message__btn">
        <BlmButton btnClick={handleConfirm} title="确定"></BlmButton>
      </View>
      <View className="message__code" onClick={goIdentity}>
        手机获取不到验证码<View className="message__icon"></View>
      </View>
    </View>
  );
}
