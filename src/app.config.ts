export default defineAppConfig({
  pages: [
    // 首页
    'pages/index/index',
    // 扫码失败
    'pages/scanFail/index',
    // 隐私协议
    'pages/agreement/index',
    // 手机号登陆页面
    'pages/login/index',
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
