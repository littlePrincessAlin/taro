import { send } from '@/utils/request';

const APIS = {
  pictureGet: '/h5/v1/scrm/wechat/auth/verify/picture/get', // 图形验证码查询
  pictureCheck: '/h5/v1/scrm/wechat/auth/verify/picture/check', // 图形验证码校验
  login: '/h5/v1/scrm/wechat/auth/login', // 司机手机号登陆
  sendCode: '/h5/v1/scrm/wechat/auth/verify/sendCode', // 发送验证码
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
