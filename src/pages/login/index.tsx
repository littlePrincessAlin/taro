import { View } from '@tarojs/components';
import {
  useRouter,
  useLoad,
  getStorage,
  setStorage,
  login,
  redirectTo,
  showToast,
  getPrivacySetting,
} from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { sendCode } from '@/services/index';
import PrivateSetting from '@/components/privateSetting';
import Message from './message';
import Phone from './phone';
import './index.scss';

export default function Login() {
  // 是否需要授权隐私协议
  const [needAuthorization, setNeedAuthorization] = useState(false);
  // 获取路由
  const router = useRouter();
  const { tenantId = '1', imgIdentity = '', driverMobile = '' } = router.params;
  // 当前手机号
  const [phone, setPhone] = useState('');
  // 登陆
  const handleLogin = () => {
    login({
      success: async function (loginRes) {
        if (loginRes?.code) {
          // 记录code码，后面登陆时给服务获取 session_key、unionid、openid ==> token
          setStorage({
            key: 'blmUserCode',
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
  // 获取手机号
  const handlePhone = (val) => {
    setPhone(val);
  };

  useLoad(() => {
    // 先判断二维码是否携带租户id
    if (!tenantId) {
      redirectTo({
        url: '/pages/scanFail/index',
      });
      return;
    }
    setStorage({
      key: 'tenantId',
      data: tenantId,
    });
    handleSetting();
    // 查看缓存
    getStorage({
      key: 'blmToken',
      fail: (err) => {
        handleLogin();
      },
      success: async (res) => {
        console.log('token:', res.data);
        // 如果有缓存直接重定向到任务页
        if (res?.data) {
          redirectTo({
            url: '/pages/task/index',
          });
        } else {
          handleLogin();
        }
      },
    });
  });

  useEffect(() => {
    if (imgIdentity === 'success') {
      showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000,
      });
      sendCode({
        mobile: driverMobile,
        tenantId,
      }).then((res) => {
        console.log('获取短信验证码:', res.data);
        const { data, msg } = res?.data || {};
        if (!data) {
          showToast({
            title: msg,
            icon: 'none',
            duration: 2000,
          });
        }
      });
    }
  }, [imgIdentity]);

  return (
    tenantId && (
      <View>
        <View className="login">
          <View className="login__navBar"></View>
          <View className="login__header">
            <View className="login__header--name">约约出行</View>
            <View className="login__header--title">直播培训签到</View>
            <View className="login__header--subTitle">
              {imgIdentity === 'success'
                ? `验证码已发送至 ${phone}`
                : '请您输入您的出车手机号进行直播签到'}
            </View>
          </View>
          <View className="login__content">
            {imgIdentity === 'success' ? (
              <Message driverMobile={driverMobile} tenantId={tenantId} />
            ) : (
              <Phone handlePhone={handlePhone} tenantId={tenantId} />
            )}
          </View>
        </View>
        {/* 隐私协议 */}
        <PrivateSetting needAuthorization={needAuthorization}></PrivateSetting>
      </View>
    )
  );
}
