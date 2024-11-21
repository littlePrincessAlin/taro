import { View } from '@tarojs/components';
import './index.scss';

interface ButtonProps {
  title: string; // 按钮
  type?: string; // 按钮类型
  btnClick?: () => void;
  bkColor?: string;
  titleColor?: string;
  titleFontSize?: string;
  className?: any;
}
export default function BlmButton(props: ButtonProps) {
  const {
    title = '确认',
    btnClick,
    type = 'primary',
    titleColor = '#FFFFFF',
    titleFontSize = '18px',
    bkColor = 'linear-gradient(280deg, #175CE6 0%, #3377FF 100%)',
  } = props;
  return (
    <View
      className="btn"
      style={{
        background: bkColor,
        color: titleColor,
        fontSize: titleFontSize,
      }}
      onClick={btnClick}
    >
      {title}
    </View>
  );
}
