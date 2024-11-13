import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
// import aliNoCaptchaInfo from './const';
import './index.scss';

export default function Slider() {
  const [nc, setNc] = useState('');
  // 初始化滑块
  // const init = () => {
  //   const awsc = (window as any).AWSC;
  //   if (!awsc) return;
  //   const { id, appkey, scene } = aliNoCaptchaInfo;
  //   awsc.use(id, function (state, module) {
  //     // 初始化
  //     const res = module.init({
  //       appkey: appkey,
  //       scene: scene,
  //       // 滑块渲染的DOM id。
  //       renderTo: 'nc',
  //       success: function (data) {
  //         console.log('data', data);
  //         //   data.scene = self.scene;
  //         console.log('成功', data);
  //       },
  //       // 滑动验证失败时触发该回调参数。
  //       fail: function (failCode) {
  //         console.log('slideVerifyFail', failCode);
  //       },
  //       // 验证码加载出现异常时触发该回调参数。
  //       error: function (errorCode) {
  //         console.log(errorCode, 'slideVerifyError');
  //       },
  //     });
  //     console.log('res', res);
  //     setNc(res);
  //   });
  // };

  useLoad(() => {
    console.log('滑块初始化了么？');
    // init();
  });

  return (
    <View className="slider">
      <View className="slider__title">正在为您进行安全验证</View>
      <View id="slider"></View>
    </View>
  );
}
