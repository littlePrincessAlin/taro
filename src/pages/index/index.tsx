import { View, Text, CoverImage } from '@tarojs/components';
import {
  useRouter,
  useLoad,
  getPrivacySetting,
  setStorage,
  login,
  redirectTo,
  navigateTo,
} from '@tarojs/taro';
import { useState } from 'react';
import { OsActionsheet } from 'ossaui';
import tabBar from '@/assets/banner.png';
import './index.scss';

export default function Index() {
  const router = useRouter();
  const { tenentId = '1' } = router.params;
  const [visible, setVisible] = useState(false);

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
  // 参加培训
  const goTask = () => {
    navigateTo({
      url: '/pages/login/index',
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
      <View className="home">
        <CoverImage className="home__navBar" src={tabBar} />
        <View className="home__title">欢迎来到「司机培训中心」</View>
        <View className="home__task" onClick={goTask}>
          参加培训
        </View>
        <OsActionsheet title="温馨提示" isShow={visible} onClose={handleCancel}>
          <View className="home__contentTip">
            尊敬的用户，为向您提供更优质的服务，在使用司机培训小程序前，需要您仔细阅读并同意隐私协议。隐私协议主要包含对您个人信息的收集，根据手机号码确定您的身份，并提供对应的培训场次。
          </View>
          <View className="home__contentText">
            请阅读并同意
            <Text className="home__contentText--text" onClick={goAgreement}>
              《隐私协议》
            </Text>
          </View>
          <View className="home__btnContent">
            <View
              className="home__btn home__btn--disAgree"
              onClick={handleCancel}
            >
              不同意
            </View>
            <View
              className="home__btn home__btn--agree"
              onClick={handleConfirm}
            >
              同意
            </View>
          </View>
        </OsActionsheet>
      </View>
    )
  );
}
