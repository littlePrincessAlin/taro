import { View, Text, Button } from '@tarojs/components';
import { OsActionsheet } from 'ossaui';
import './index.scss';

interface PrivateSettingProps {
  isShow: boolean;
  handleCancel: () => void;
  goAgreement: () => void;
  handleConfirm: () => void;
}
export default function PrivateSetting(props: PrivateSettingProps) {
  const { isShow, handleCancel, goAgreement, handleConfirm } = props || {};

  return (
    <OsActionsheet isShow={isShow} title="温馨提示" onClose={handleCancel}>
      <View className="private__contentTip">
        尊敬的用户，为向您提供更优质的服务，在使用司机培训小程序前，需要您仔细阅读并同意隐私协议。隐私协议主要包含对您个人信息的收集，根据手机号码确定您的身份，并提供对应的培训场次。
      </View>
      <View className="private__contentText">
        请阅读并同意
        <Text className="private__contentText--text" onClick={goAgreement}>
          《隐私协议》
        </Text>
      </View>
      <View className="private__btnContent">
        <View
          className="private__btn private__btn--disAgree"
          onClick={handleCancel}
        >
          不同意
        </View>
        <Button
          openType="agreePrivacyAuthorization"
          className="private__btn private__btn--agree"
          onClick={handleConfirm}
        >
          同意
        </Button>
      </View>
    </OsActionsheet>
  );
}
