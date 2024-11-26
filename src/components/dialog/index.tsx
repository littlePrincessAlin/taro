import { View } from '@tarojs/components';
import BlmButton from '../button';
import './index.scss';

interface BlmDialogProps {
  isShow: boolean;
  title: string;
  closeDialog: () => void;
  content?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  cancelBtnClick?: () => void;
  confirmBtnClick?: () => void;
}

export default function BlmDialog(props: BlmDialogProps) {
  const {
    isShow,
    title = '',
    content = '',
    cancelBtnText = '',
    cancelBtnClick,
    confirmBtnClick,
    closeDialog,
    confirmBtnText = '',
  } = props || {};
  const handleClose = () => {
    closeDialog();
  };

  return (
    isShow && (
      <View className="dialog">
        <View className="dialog__mask" onClick={handleClose}></View>
        <View className="dialog__container">
          <View className="dialog__title">{title}</View>
          <View className="dialog__content">{content}</View>
          <View className="dialog__btn">
            {cancelBtnText && (
              <View className="dialog__btn--left">
                <BlmButton
                  bkColor="#FFFFFF"
                  titleColor="rgba(0, 0, 0, 0.9)"
                  titleFontSize="16px"
                  btnClick={cancelBtnClick}
                  title={cancelBtnText}
                ></BlmButton>
              </View>
            )}
            {confirmBtnText && (
              <View className="dialog__btn--right">
                <BlmButton
                  titleFontSize="16px"
                  btnClick={confirmBtnClick}
                  title={confirmBtnText}
                ></BlmButton>
              </View>
            )}
          </View>
        </View>
      </View>
    )
  );
}
