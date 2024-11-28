import { request } from '@tarojs/taro';

// 从环境变量中获取 API_HOST
const API_HOST = process.env.TARO_APP_APIHOST;

export const send = (options): Promise<any> => {
  const { url = '', method = 'POST', data, timeout = 6000 } = options || {};
  return new Promise((resolve, reject) => {
    console.log('请求的url--->', API_HOST + url);
    request({
      url: API_HOST + url,
      data,
      method,
      timeout,
      header: {
        // wechat_sid:
        // _admin_eid:
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
