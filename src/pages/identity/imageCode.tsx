import { View, Input } from '@tarojs/components';
import { redirectTo } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { pictureGet } from '@/services/index';
import './index.scss';

const maxlength = 4;
export default function ImageCode() {
  const [imageCode, setImageCode] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const handleInput = (event) => {
    const { value = '' } = event?.detail || {};
    console.log('value: ', value);
    setImageCode(value);
    if (false) {
      redirectTo({
        url: '/pages/login/index?imgIdentity=success',
      });
    }
  };
  const onFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const fetchImg = async () => {
    const res = await pictureGet();
    console.log(res, '?????');
  };

  useEffect(() => {
    fetchImg();
  }, []);
  return (
    <View className="imageCode">
      <View className="imageCode__title">请输入图形验证码</View>
      <View className="imageCode__img">
        <img src="https://h5.yueyuechuxing.cn/pintu/imgs/65e7dba45e445c7eb22ce0c04386cf4b.png"></img>
      </View>
      <View className="imageCode__subTitle">点击图片刷新</View>
      <View className="imageCode__content">
        <View className="imageCode__content--input">
          <Input
            style={{ height: '0', width: '0', margin: '0' }}
            value={imageCode}
            maxlength={maxlength}
            focus={isFocus}
            onInput={handleInput}
            onBlur={handleBlur}
            adjustPosition={false}
          ></Input>
          <View onTap={onFocus} className="imageCode__content--item">
            {imageCode[0]}
          </View>
          <View onTap={onFocus} className="imageCode__content--item">
            {imageCode[1]}
          </View>
          <View onTap={onFocus} className="imageCode__content--item">
            {imageCode[2]}
          </View>
          <View onTap={onFocus} className="imageCode__content--item">
            {imageCode[3]}
          </View>
        </View>
        <View className="imageCode__content--tip">4位字母（不区分大小写）</View>
      </View>
    </View>
  );
}
