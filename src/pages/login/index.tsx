import { View } from '@tarojs/components';
import {
  useRouter,
  useLoad,
  setStorage,
  login,
  redirectTo,
  navigateTo,
  getPrivacySetting,
} from '@tarojs/taro';
import { useState } from 'react';
import PrivateSetting from '@/components/privateSetting';
import Message from './message';
import Phone from './phone';
import './index.scss';

export default function Login() {
  // 是否需要授权隐私协议
  const [needAuthorization, setNeedAuthorization] = useState(false);
  // 获取路由
  const router = useRouter();
  const { tenentId = '1' } = router.params;
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
        setNeedAuthorization(res.needAuthorization);
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
    tenentId && (
      <View>
        <View className="login">
          <View className="login__navBar"></View>
          <View className="login__header">
            <View className="login__header--name">约约出行</View>
            <View className="login__header--title">直播培训签到</View>
            <View className="login__header--subTitle">
              {false
                ? '请您输入您的出车手机号进行直播签到'
                : '验证码已发送至 18888888888'}
            </View>
          </View>
          <View className="login__content">
            {/* <Message /> */}
            <Phone />
          </View>
        </View>
        {/* 隐私协议 */}
        <PrivateSetting needAuthorization={needAuthorization}></PrivateSetting>
      </View>
    )
  );
}
