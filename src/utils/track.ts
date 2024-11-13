// 监控埋点方法
import { getMonitorInstance, getEventLogInstance } from '@leopard-h5/core';

let logger = null as any;

export const logEvent = ({ pageId, clickId, ext = {} }) => {
  if (!logger) return;
  logger.send({ pageId, clickId, ext });
};

export const MonitorPlugin = () => {
  const config = {
    isInApp: false,
    appnm: 'taro',
    project: 'leopard-h5-taro',
    uid: 'sss', // TODO
    tenantId: '1', // TODO
  };
  getMonitorInstance(config);
  logger = getEventLogInstance(config);
};
