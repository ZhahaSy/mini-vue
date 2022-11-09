import cleanup from './cleanup.js';

const bucket = new WeakMap();

let activeFn = null;

let effectStack = [];

export const effect = (fn, options = {}) => {
  const effctFn = () => {
    cleanup(effctFn);
    activeFn = effctFn;

    effectStack.push(activeFn);
    const res = fn();
    effectStack.pop();
    activeFn = effectStack[effectStack.length - 1]
    return res
  };
  effctFn.options = options;
  effctFn.deps = [];
  if (!options.lazy) {
    effctFn();
  }
  return effctFn
};

export const track = (target, prop) => {
  if (!activeFn) return target[prop];
  let effctMap = bucket.get(target);
  if (!effctMap) {
    bucket.set(target, (effctMap = new Map()));
  }

  let effectList = effctMap.get(prop);

  if (!effectList) {
    effctMap.set(prop, (effectList = new Set()));
  }

  effectList.add(activeFn);

  activeFn.deps.push(effectList);
};

export const trigger = (target, prop) => {
  let effctMap = bucket.get(target);
  if (!effctMap) return;

  let effectList = effctMap.get(prop);

  const effectListToRun = new Set();

  effectList &&
  effectList.forEach((fn) => {
      if (fn !== activeFn) {
        effectListToRun.add(fn)
      }
    });
  effectListToRun.forEach((fn) => {
    if(fn.options.scheduler) {
      fn.options.scheduler(fn)
    } else {
      fn()
    }
  });
};