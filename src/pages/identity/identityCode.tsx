import { View, Input } from '@tarojs/components';
import {
  useRouter,
  getStorage,
  showToast,
  setStorage,
  redirectTo,
  showLoading,
  hideLoading,
} from '@tarojs/taro';
import { useState } from 'react';
import { fetchLogin } from '@/services/index';
import { checkID } from '@/utils/tool';
import BlmButton from '@/components/button';
import './index.scss';

const maxLength = 18;

export default function IdentityCode() {
  const [identityCode, setIdentityCode] = useState('');
  // 获取路由
  const router = useRouter();
  const { mobile = '', tenantId = '' } = router.params;

  const goNext = () => {
    if (!checkID(identityCode)) {
      showToast({
        title: '请输入正确的身份证号码',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    showLoading({
      title: '加载中',
    });
    getStorage({
      key: 'blmUserCode',
      fail: () => {
        showToast({
          title: '登陆失败',
          icon: 'none',
          duration: 2000,
        });
        hideLoading();
      },
      success: async (res) => {
        const loginRes = await fetchLogin({
          tenantId,
          driverMobile: mobile,
          verifyType: 2,
          idCardNo: identityCode,
          userAuthCode: res.data,
        });
        console.log('loginRes', loginRes);
        const { data, msg } = loginRes?.data || {};
        if (!data) {
          showToast({
            title: msg,
            icon: 'none',
            duration: 2000,
          });
        } else {
          setStorage({
            key: 'blmToken',
            data,
          });
          redirectTo({
            url: '/pages/task/index',
          });
        }
        hideLoading();
      },
    });
  };
  const handleInput = (event) => {
    const { value = '' } = event?.detail || {};
    console.log('value: ', value);
    setIdentityCode(value);
  };

  // 处理手机号
  const handleFormatPhone = (phone) => {
    const first = phone.slice(0, 3).length ? phone.slice(0, 3) : '';
    const second = phone.slice(3, 7).length ? ` ${phone.slice(3, 7)}` : '';
    const third = phone.slice(7, phone.length).length
      ? ` ${phone.slice(7, phone.length)}`
      : '';
    const showValue = `${first}${second}${third}`;
    return showValue;
  };

  return (
    <View className="identityCode">
      <View className="identityCode__header">
        <View className="identityCode__header--title">约约出行</View>
        <View className="identityCode__header--tip">请验证身份信息</View>
        <View className="identityCode__header--number">
          当前用户手机号：+86 {handleFormatPhone(mobile)}
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
