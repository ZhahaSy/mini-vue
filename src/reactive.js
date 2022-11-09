import { track, trigger } from './effect.js'
export const Reactive = (data) =>
  new Proxy(data, {
    get(target, prop) {
      // console.log(prop, '被读取');

      track(target, prop);

      return target[prop];
    },
    set(target, prop, value) {
      // console.log(prop, '被修改为', value);
      target[prop] = value;
      trigger(target, prop);
      // 修改时， 更新响应语句
      return true;
    },
  });