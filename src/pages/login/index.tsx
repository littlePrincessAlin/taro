import { View } from '@tarojs/components';
import {
  useRouter,
  useLoad,
  getPrivacySetting,
  setStorage,
  login,
  redirectTo,
  navigateTo,
  navigateToMiniProgram,
} from '@tarojs/taro';
import { useState } from 'react';
import PrivateSetting from '@/components/privateSetting';
import Message from './message';
import Phone from './phone';
import './index.scss';

export default function Login() {
  const router = useRouter();
  const { tenentId = '1' } = router.params;
  const [visible, setVisible] = useState(false);
  // 同意查看隐私协议
  const handleConfirm = () => {
    setVisible(false);
  };
  // 不同意查看隐私协议
  const handleCancel = () => {
    setVisible(false);
  };
  // 前往隐私协议
  const goAgreement = () => {
    navigateTo({
      url: '/pages/agreement/index',
    });
  };
  // 登陆
  const handleLogin = () => {
    login({
      success: async function (loginRes) {
        if (loginRes?.code) {
          // 记录code码，后面登陆时给服务获取 session_key、unionid、openid ==> token
          setStorage({
            key: 'blmCode',
            data: loginRes.code,
          });
        } else {
          console.log('登录失败！' + loginRes.errMsg);
        }
      },
    });
  };

  // 隐私协议
  const handleSetting = () => {
    getPrivacySetting({
      complete: (res: any) => {
        console.log('隐私协议', res);
        if (res.needAuthorization) {
          // 需要弹出隐私协议
          setVisible(true);
        } else {
          // 用户已经同意过隐私协议，所以不需要再弹出隐私协议
        }
      },
    });
  };
  useLoad(() => {
    // 先判断二维码是否携带租户id
    if (!tenentId) {
      redirectTo({
        url: '/pages/scanFail/index',
      });
      return;
    }
    handleSetting();
  });
  return (
    <View>
      <View className="login">
        <View className="login__navBar"></View>
        <View className="login__header">
          <View className="login__header--name">约约出行</View>
          <View className="login__header--title">直播培训签到</View>
          <View className="login__header--subTitle">
            请您输入您的出车手机号进行直播签到
          </View>
        </View>
        <View className="login__content">
          <Phone />
        </View>
      </View>
      {/* 隐私协议 */}
      <PrivateSetting
        isShow={visible}
        handleCancel={handleCancel}
        goAgreement={goAgreement}
        handleConfirm={handleConfirm}
      ></PrivateSetting>
    </View>
  );
}
