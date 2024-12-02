import { View, ScrollView } from '@tarojs/components';
import { navigateBack, showToast, navigateToMiniProgram } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { getTaskList, checkIn, logout, getLivingCode } from '@/services/index';
import BlmButton from '@/components/button';
import BlmDialog from '@/components/dialog';
import Card from './card';
import './index.scss';

export default function Task() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showCheckOutDialog, setShowCheckOutDialog] = useState(false);
  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const [list, setList] = useState([]) as any;
  const refresh = () => {
    console.log('refresh');
    fetchData();
  };

  const handleClick = async (item) => {
    const { signStatus, livingId } = item || {};
    if (signStatus == 2) {
      // 前往直播间
      handleLiving(livingId);
    } else {
      handleCheckIn(item);
    }
  };

  // 前往直播间
  const handleLiving = async (livingId) => {
    const res = await getLivingCode({ livingId });
    const { data } = res?.data || {};
    data &&
      navigateToMiniProgram({
        appId: 'wxd0928c8ecdc0d88c',
        path: `pages/watch/index?living_code=${data}`,
        success(sucessObj) {
          // 打开成功
          console.log('???', sucessObj);
        },
        fail() {
          showToast({
            title: '直播间打开失败',
            icon: 'none',
            duration: 2000,
          });
        },
      });
    !data &&
      showToast({
        title: '直播间打开失败',
        icon: 'none',
        duration: 2000,
      });
  };

  // 签到
  const handleCheckIn = async (item) => {
    const { livingId, taskId } = item || {};
    const res = await checkIn({
      taskId,
      livingId,
    });
    const { data } = res?.data || {};
    if (data) {
      showToast({
        title: '签到成功',
        icon: 'none',
        duration: 2000,
      });
      fetchData();
    } else {
      // 签到失败
      setShowLoginDialog(true);
    }
  };

  // 退出登陆
  const handleCheckOut = () => {
    setShowCheckOutDialog(true);
  };
  // 退出登陆弹窗确认
  const confirmBtnClick = async () => {
    const res = await logout();
    const { data } = res?.data || {};
    if (data) {
      setShowCheckOutDialog(false);
      navigateBack({
        delta: 1,
      });
    } else {
      showToast({
        title: '退出登陆失败',
        icon: 'none',
        duration: 2000,
      });
    }
  };

  const onRefresherRefresh = () => {
    setRefresherTriggered(true);
    console.log('!!!');
    setTimeout(() => {
      setRefresherTriggered(false);
    }, 1000);
  };

  const fetchData = async () => {
    const res = await getTaskList();
    console.log('获取直播间数据', res);
    const { data = [] } = res?.data || {};
    if (Array.isArray(data) && data.length) {
      setList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="task">
      <View className="task__navBar"></View>
      <img
        onClick={handleCheckOut}
        className="task__back"
        src="https://h5.yueyuechuxing.cn/pintu/imgs/d77a3e88feb5b788541a962bf071b526.png"
      ></img>
      <View className="task__content">
        {list.length ? (
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
            {list.map((item) => {
              const { taskId, taskName, livingInfoVOList = [] } = item || {};
              return (
                <View key={taskId}>
                  <View className="task__content--subTitle">{taskName}</View>
                  {livingInfoVOList.map((livingItem) => {
                    const {
                      signStatus,
                      livingId,
                      reserveDuration,
                      reserveStartTime,
                    } = livingItem || {};
                    return (
                      <Card
                        signStatus={signStatus}
                        key={livingId}
                        reserveStartTime={reserveStartTime}
                        reserveDuration={reserveDuration}
                        handleClick={() =>
                          handleClick({ ...livingItem, taskId })
                        }
                      />
                    );
                  })}
                </View>
              );
            })}
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
