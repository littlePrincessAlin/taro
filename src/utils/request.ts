import { request, batchGetStorageSync } from '@tarojs/taro';

// 从环境变量中获取 API_HOST
const API_HOST = process.env.TARO_APP_APIHOST;

export const send = (options): Promise<any> => {
  const { url = '', method = 'POST', data, timeout = 6000 } = options || {};
  const valueList = batchGetStorageSync(['blmToken', 'tenantId']) || [];
  console.log('获取缓存', valueList);
  return new Promise((resolve, reject) => {
    console.log('请求的url--->', API_HOST + url);
    console.log('请求的入参--->', data);
    request({
      url: API_HOST + url,
      data,
      method,
      timeout,
      header: {
        wechat_sid: valueList[0] && valueList[0],
        _admin_eid: valueList[1] && valueList[1],
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
