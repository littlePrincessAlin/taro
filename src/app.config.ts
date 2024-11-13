export default defineAppConfig({
  pages: [
    // 首页
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  // TODO: 分包
  subpackages: [],
  // TODO: 小程序权限接口
  permission: {},
});
