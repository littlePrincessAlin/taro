import { View } from '@tarojs/components';
import BlmButton from '@/components/button';
import './index.scss';

interface CardProps {
  isLogin: boolean;
  handleClick: () => void;
  key?: any;
}

export default function Card(props: CardProps) {
  const { isLogin, handleClick } = props || {};

  return (
    <View className="card">
      <View className="card__time">直播开始时间：2024年11月1日 18:00</View>
      <View className="card__time">直播预计时长：35分钟</View>
      <View
        className="card__btn"
        style={
          !isLogin ? { border: '1px solid #175CE5', borderRadius: '12px' } : {}
        }
      >
        <BlmButton
          btnClick={handleClick}
          title={isLogin ? '已签到，前往直播间' : '签到'}
          bkColor={
            isLogin
              ? 'linear-gradient(280deg, #175CE6 0%, #3377FF 100%)'
              : '#FFFFFF'
          }
          titleColor={isLogin ? '#FFFFFF' : '#175CE5'}
        ></BlmButton>
      </View>
    </View>
  );
}
