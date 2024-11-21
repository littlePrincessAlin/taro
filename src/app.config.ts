export default defineAppConfig({
  pages: [
    // 手机号登陆页面
    'pages/login/index',
    // 首页
    'pages/index/index',
    // 扫码失败
    'pages/scanFail/index',
    // 任务详情页
    'pages/task/index',
    // 隐私协议
    'pages/agreement/index',
  ],
  __usePrivacyCheck__: true,
  window: {
    backgroundTextStyle: 'light',
  },
  // TODO: 分包
  subpackages: [],
  // TODO: 小程序权限接口
  permission: {},
});
