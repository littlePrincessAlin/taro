import { send } from '@/utils/request';

const APIS = {
  pictureGet: '/h5/v1/scrm/wechat/auth/verify/picture/get', // 图形验证码查询
  pictureCheck: '/h5/v1/scrm/wechat/auth/verify/picture/check', // 图形验证码校验
  login: '/h5/v1/scrm/wechat/auth/login', // 司机手机号登陆
};
export const pictureGet = () => {
  return send({ url: APIS['pictureGet'] });
};
export const pictureCheck = () => {
  return send({ url: APIS['pictureCheck'] });
};
export const fetchLogin = (data) => {
  return send({ url: APIS['login'], data });
};
