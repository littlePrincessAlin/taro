// loading页面
import { View } from '@tarojs/components';
import { ABNORMAL, EMPTY, OFF_LINE } from './const';
import BlmButton from '../button';
import './index.scss';

export default function PageLoading(props) {
  const { type = 'empty', refresh } = props || {};
  const ImgType = {
    abnormal: ABNORMAL,
    empty: EMPTY,
    offline: OFF_LINE,
  };
  return (
    <View className="loading">
      <img className="loading__icon" src={ImgType[type]} />
      {type === 'empty' && <View className="loading__text">正在加载中...</View>}
      {type === 'abnormal' && <View className="loading__text">页面出错了</View>}
      {type === 'offline' && <View className="loading__text">网络不给力</View>}
      {(type === 'abnormal' || type === 'offline') && (
        <View className="loading__btn">
          <BlmButton title="再试一次" btnClick={refresh}></BlmButton>
        </View>
      )}
    </View>
  );
}
