import { send } from '@/utils/request';

const APIS = {
  pictureGet: '/h5/v1/scrm/wechat/auth/verify/picture/get', // 图形验证码查询
  pictureCheck: '/h5/v1/scrm/wechat/auth/verify/picture/check', // 图形验证码校验
  login: '/h5/v1/scrm/wechat/auth/login', // 司机手机号登陆
  sendCode: '/h5/v1/scrm/wechat/auth/verify/sendCode', // 发送验证码
  getTaskList: '/h5/v1/scrm/wechat/living/getTaskList', // 直播任务列表
  checkIn: '/h5/v1/scrm/wechat/living/checkIn', // 直播签到
  getLivingCode: '/h5/v1/scrm/wechat/living/getLivingCode', // 获取直播观看凭证
  logout: '/h5/v1/scrm/wechat/auth/logout', // 退出登陆
};
export const pictureGet = (data) => {
  return send({ url: APIS['pictureGet'], data });
};
export const pictureCheck = (data) => {
  return send({ url: APIS['pictureCheck'], data });
};
export const fetchLogin = (data) => {
  return send({ url: APIS['login'], data });
};

export const sendCode = (data) => {
  return send({ url: APIS['sendCode'], data });
};

export const getTaskList = () => {
  return send({ url: APIS['getTaskList'] });
};

export const checkIn = (data) => {
  return send({ url: APIS['checkIn'], data });
};

export const getLivingCode = (data) => {
  return send({ url: APIS['getLivingCode'], data });
};

export const logout = () => {
  return send({ url: APIS['logout'] });
};
