const ci = require('miniprogram-ci');
const fs = require('fs');
const path = require('path');

const configJson = path.join(process.cwd(), 'project.config.json');
const packageJson = path.join(process.cwd(), 'package.json');
const version = require(packageJson).version;
console.log('当前版本号：', version);
fs.readFile(configJson, 'utf8', async function (err, data) {
  if (data && JSON.parse(data)) {
    const appid = JSON.parse(data).appid;
    const keyFilePath = path.join(process.cwd(), `lilin/private.${appid}.key`);
    const project = new ci.Project({
      appid,
      type: 'miniProgram',
      projectPath: path.join(process.cwd(), ''),
      privateKeyPath: keyFilePath,
      ignores: ['node_modules/**/*'],
    });
    const uploadResult = await ci.upload({
      project,
      version,
      desc: '小程序发布',
      setting: {
        es6: true,
        es7: true,
      },
      onProgressUpdate: console.log,
    });
    console.log(uploadResult);
    const previewResult = await ci.preview({
      project,
      desc: '小程序发布',
      setting: {
        es6: true,
        es7: true,
      },
      qrcodeFormat: 'image',
      qrcodeOutputDest: `${appid}_${version}.jpg`,
      pagePath: 'pages/login/index',
      onProgressUpdate: console.log,
    });
    console.log('previewResult', previewResult);
  } else {
    console.log('打包失败');
  }
});
