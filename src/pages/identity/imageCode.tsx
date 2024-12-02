import { View, Input } from '@tarojs/components';
import {
  redirectTo,
  useRouter,
  showToast,
  showLoading,
  hideLoading,
  onNetworkStatusChange,
  offNetworkStatusChange,
} from '@tarojs/taro';
import { useEffect, useState } from 'react';
import PageLoading from '@/components/pageLoading';
import { pictureGet, pictureCheck } from '@/services/index';
import './index.scss';

const maxlength = 4;
export default function ImageCode() {
  const [pageType, setPageType] = useState('empty');
  const [imageCode, setImageCode] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState('');
  // 获取路由
  const router = useRouter();
  const { mobile = '', tenantId = '' } = router.params;

  const handleInput = async (event) => {
    const { value = '' } = event?.detail || {};
    console.log('value: ', value);
    setImageCode(value);
    if (value.length === maxlength) {
      showLoading({
        title: '正在校验',
      });
      const checkRes = await pictureCheck({
        mobile,
        verifyCode: value,
      });
      console.log('checkRes:', checkRes);
      const { data, msg } = checkRes?.data || {};
      if (1) {
        redirectTo({
          url: `/pages/login/index?imgIdentity=success&driverMobile=${mobile}&tenantId=${tenantId}`,
        });
      } else {
        showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        });
        setImageCode('');
      }
      hideLoading();
    }
  };
  const onFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleRefresh = () => {
    setImageCode('');
    fetchImg();
  };

  const fetchImg = async () => {
    setPageType('empty');
    const res = await pictureGet({ mobile });
    const { data } = res?.data || {};
    console.log('获取图片:', data);
    if (data) {
      setImage('data:image/png;base64,' + data);
      setPageType('');
    } else {
      setPageType('abnormal');
    }
  };

  useEffect(() => {
    // 监听网络状态
    onNetworkStatusChange((res) => {
      const { isConnected } = res || {};
      console.log('???', isConnected);
      if (!isConnected) {
        setPageType('offline');
      }
    });
    fetchImg();
    return () => {
      offNetworkStatusChange();
    };
  }, []);

  return pageType ? (
    <PageLoading type={pageType} refresh={handleRefresh} />
  ) : (
    <View className="imageCode">
      <View className="imageCode__title">请输入图形验证码</View>
      <View className="imageCode__img">
        <img src={image}></img>
      </View>
      <View className="imageCode__subTitle" onClick={handleRefresh}>
        点击图片刷新
      </View>
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
