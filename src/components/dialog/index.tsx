import { View } from '@tarojs/components';
import BlmButton from '../button';
import './index.scss';

interface BlmDialogProps {
  title: string;
  content?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  cancelBtnClick?: () => void;
  confirmBtnClick?: () => void;
}

export default function BlmDialog(props: BlmDialogProps) {
  const {
    title = '',
    content = '',
    cancelBtnText = '',
    cancelBtnClick,
    confirmBtnClick,
    confirmBtnText = '',
  } = props || {};
  return (
    <View>
      <View>{title}</View>
      <View>{content}</View>
      <View>
        <BlmButton btnClick={cancelBtnClick} title={cancelBtnText}></BlmButton>
        <BlmButton
          btnClick={confirmBtnClick}
          title={confirmBtnText}
        ></BlmButton>
      </View>
    </View>
  );
}
