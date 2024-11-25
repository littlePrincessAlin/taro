import { View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import BlmButton from '@/components/button';
import Card from './card';
import './index.scss';

export default function Task() {
  const refresh = () => {};
  useLoad(() => {});
  return (
    <View className="task">
      <View className="task__navBar"></View>
      <img
        className="task__back"
        src="https://h5.yueyuechuxing.cn/pintu/imgs/d77a3e88feb5b788541a962bf071b526.png"
      ></img>
      <View className="task__content">
        {true ? (
          <View>
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
          </View>
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
    </View>
  );
}
