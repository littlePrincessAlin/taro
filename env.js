const fs = require('fs');

/**
 * taro build --type weapp --env=daily
 *    process.env.npm_config_env  ==> daily
 *
 * taro build --type weapp --env=daily
 *    process.env.npm_lifecycle_script  ==> "pnpm run build --env=daily" ==> replace & split ==> daily
 */
function getCurrentEnv() {
  let currentEnv = process.env.npm_config_env;
  if (!currentEnv) {
    const envReg = /--env=['"]?(\w+)/g;
    const mathchRes = envReg.exec(process.env.npm_lifecycle_script);
    if (mathchRes && mathchRes[1]) {
      currentEnv = mathchRes[1];
    }
  }
  return currentEnv || 'local';
}

// 获取环境变量
const env = getCurrentEnv();

const envConfig = {
  sit: {
    TARO_APP_APIHOST: 'https://apitest-sit.yueyuechuxing.cn',
  },
  local: {
    TARO_APP_APIHOST: 'https://apitest.yueyuechuxing.cn',
  },
  dev: {},
  daily: {
    TARO_APP_APIHOST: 'https://apitest.yueyuechuxing.cn',
  },
  daily2: {},
  pre: {
    TARO_APP_APIHOST: 'https://api2-pre2.yueyuechuxing.cn',
  },
  gray: {
    TARO_APP_APIHOST: 'https://api2.yueyuechuxing.cn',
  },
  public: {
    TARO_APP_APIHOST: 'https://api2.yueyuechuxing.cn',
  },
  publish: {},
};

const envData = envConfig[env] || {};
Object.assign(envData, {
  TARO_APP_ENV: env,
});
const fileName = '.env.local';
fs.writeFileSync(fileName, '', { flag: 'w' });
for (const key in envData) {
  const line = `${key}=${envData[key]}\n`;
  fs.appendFileSync(fileName, line);
}
