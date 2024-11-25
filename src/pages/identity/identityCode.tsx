import { View, Input } from '@tarojs/components';
import { useLoad, hideHomeButton } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import BlmButton from '@/components/button';
import './index.scss';

const maxLength = 18;

export default function IdentityCode() {
  const [identityCode, setIdentityCode] = useState('');
  const goNext = () => {};
  const handleInput = () => {};
  useLoad(() => {});
  return (
    <View className="identityCode">
      <View className="identityCode__header">
        <View className="identityCode__header--title">约约出行</View>
        <View className="identityCode__header--tip">请验证身份信息</View>
        <View className="identityCode__header--number">
          当前用户手机号：+86 176 0011 3681
        </View>
      </View>
      <View className="identityCode__footer">
        <View className="identityCode__footer--title">身份证号码</View>
        <Input
          placeholder="请输入"
          maxlength={maxLength}
          value={identityCode}
          onInput={handleInput}
          adjustPosition={false}
        ></Input>
        <View className="identityCode__btn">
          <BlmButton
            btnClick={goNext}
            title="下一步"
            bkColor={
              identityCode.length === maxLength ? '' : 'rgba(0, 0, 0, 0.09)'
            }
            titleColor="rgba(0, 0, 0, 0.2)"
          ></BlmButton>
        </View>
      </View>
    </View>
  );
}
