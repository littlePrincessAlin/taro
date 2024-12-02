import { View } from '@tarojs/components';
import BlmButton from '@/components/button';
import './index.scss';

interface CardProps {
  signStatus: number; // 1:未签到，2:已签到
  reserveStartTime: string;
  reserveDuration: number;
  handleClick: () => void;
  key?: any;
}

export default function Card(props: CardProps) {
  const { signStatus, handleClick, reserveStartTime, reserveDuration } =
    props || {};

  return (
    <View className="card">
      <View className="card__time">直播开始时间：{reserveStartTime}</View>
      <View className="card__time">直播预计时长：{reserveDuration}分钟</View>
      <View
        className="card__btn"
        style={
          signStatus == 1
            ? { border: '1px solid #175CE5', borderRadius: '12px' }
            : {}
        }
      >
        <BlmButton
          btnClick={handleClick}
          title={signStatus == 2 ? '已签到，前往直播间' : '签到'}
          bkColor={
            signStatus == 2
              ? 'linear-gradient(280deg, #175CE6 0%, #3377FF 100%)'
              : '#FFFFFF'
          }
          titleColor={signStatus == 2 ? '#FFFFFF' : '#175CE5'}
        ></BlmButton>
      </View>
    </View>
  );
}
