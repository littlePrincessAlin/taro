import { View, ScrollView } from '@tarojs/components';
import { navigateBack } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import BlmButton from '@/components/button';
import BlmDialog from '@/components/dialog';
import Card from './card';
import './index.scss';

export default function Task() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showCheckOutDialog, setShowCheckOutDialog] = useState(false);

  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const refresh = () => {
    console.log('refresh');
  };

  // 退出登陆
  const handleCheckOut = () => {
    setShowCheckOutDialog(true);
  };

  const handleClick = () => {
    if (false) {
      // 前往直播间
    } else {
      setShowLoginDialog(true);
    }
  };

  // 退出登陆弹窗确认
  const confirmBtnClick = () => {
    navigateBack({
      delta: 1,
    });
  };

  const onRefresherRefresh = () => {
    setRefresherTriggered(true);
    console.log('!!!');
    setTimeout(() => {
      setRefresherTriggered(false);
    }, 1000);
  };

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
          <ScrollView
            scrollY
            enhanced
            refresherEnabled
            refresherTriggered={refresherTriggered}
            className="task__content--scroll"
            onRefresherRefresh={onRefresherRefresh}
            showScrollbar={false}
            scrollTop={0}
            lowerThreshold={20}
            upperThreshold={20}
          >
            <View className="task__content--title">
              您好，师傅<View>请选择您要签到的直播培训</View>
            </View>
            <View>
              <View className="task__content--subTitle">新手司机培训</View>
              {[1, 2, 3].map((item) => {
                return <Card isLogin key={item} handleClick={handleClick} />;
              })}
            </View>
            <View className="task__content--old">
              <View className="task__content--subTitle">老手回炉</View>
              <Card isLogin={false} handleClick={handleClick} />
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
        closeDialog={() => setShowCheckOutDialog(false)}
        cancelBtnClick={() => setShowCheckOutDialog(false)}
        confirmBtnClick={confirmBtnClick}
        title="确定退出登录吗？"
        cancelBtnText="取消"
        confirmBtnText="确定"
      ></BlmDialog>
      <BlmDialog
        isShow={showLoginDialog}
        closeDialog={() => setShowLoginDialog(false)}
        confirmBtnClick={() => setShowLoginDialog(false)}
        title="签到失败，请添加培训师为好友后再签到"
        confirmBtnText="确定"
      ></BlmDialog>
    </View>
  );
}
