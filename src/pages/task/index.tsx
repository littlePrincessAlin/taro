import { View, ScrollView } from '@tarojs/components';
import { startPullDownRefresh } from '@tarojs/taro';
import { useState } from 'react';
import BlmButton from '@/components/button';
import BlmDialog from '@/components/dialog';
import Card from './card';
import './index.scss';

export default function Task() {
  const [showCheckOutDialog, setShowCheckOutDialog] = useState(false);
  const refresh = () => {
    console.log('refresh');
  };

  // 退出登陆
  const handleCheckOut = () => {
    setShowCheckOutDialog(true);
  };
  const closeDialog = () => {
    setShowCheckOutDialog(false);
  };
  // 退出登陆弹窗确认
  const confirmBtnClick = () => {};

  // 坚听下拉刷新
  startPullDownRefresh({
    complete: () => {
      refresh();
    },
  });

  return (
    <View className="task">
      <View className="task__navBar"></View>
      <img
        onClick={handleCheckOut}
        className="task__back"
        src="https://h5.yueyuechuxing.cn/pintu/imgs/d77a3e88feb5b788541a962bf071b526.png"
      ></img>
      <View className="task__content">
        {true ? (
          <ScrollView scrollY className="task__content--scroll">
            <View className="task__content--title">
              您好，师傅<View>请选择您要签到的直播培训</View>
            </View>
            <View>
              <View className="task__content--subTitle">新手司机培训</View>
              {[1, 2, 3].map((item) => {
                return <Card isLogin key={item} />;
              })}
            </View>
            <View>
              <View className="task__content--subTitle">老手回炉</View>
              <Card isLogin={false} />
            </View>
          </ScrollView>
        ) : (
          <View className="noTask">
            <img src="https://h5.yueyuechuxing.cn/pintu/imgs/24614d77da5fb8f0eefb156cfbf6c145.png"></img>
            <View className="noTask__title">暂无可参与的直播培训</View>
            <View className="noTask__btn">
              <BlmButton btnClick={refresh} title="刷新"></BlmButton>
            </View>
          </View>
        )}
      </View>
      <BlmDialog
        isShow={showCheckOutDialog}
        closeDialog={closeDialog}
        cancelBtnClick={closeDialog}
        confirmBtnClick={confirmBtnClick}
        title="确定退出登录吗？"
        cancelBtnText="取消"
        confirmBtnText="确定"
      ></BlmDialog>
    </View>
  );
}
