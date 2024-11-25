import { View } from '@tarojs/components';
import { useRouter, useLoad, hideHomeButton } from '@tarojs/taro';
import IdentityCode from './identityCode';
import ImageCode from './imageCode';
import './index.scss';

export default function Identity() {
  // 获取路由
  const router = useRouter();
  const { fromSource = '' } = router.params;

  useLoad(() => {});

  return (
    <View className="identity">
      {fromSource === 'identityCode' ? <IdentityCode /> : null}
      {fromSource === 'imageCode' ? <ImageCode /> : null}
    </View>
  );
}
