// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
          android: '5',
          ios: '9',
          chrome: '37',
        },
        useBuiltIns: 'usage',
        corejs: '3.39.0',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      'taro',
      {
        framework: 'react',
        ts: true,
        compiler: 'webpack5',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'ossaui',
        customName: (name) =>
          `ossaui/lib/components/${name.replace(/^os-/, '')}`,
        customStyleName: (name) =>
          `ossaui/dist/style/components/${name.replace(/^os-/, '')}.scss`,
      },
      'ossaui',
    ],
  ],
};
