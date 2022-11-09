import { effect } from "./effect.js";

function traverse(data, seen = new Set()) {
    const dataType = typeof data;
    // 如果要读取的值是原始数据类型 或 已经被读取过(防止数据被循环引用引起的死循环) 就什么都不做
    if (dataType !== 'object' || data === null || seen.has(data)) {
        seen.add(data)
        for (const k in data) {
            traverse(data[key], seen)
        }
    }

    return data

}

export default (source, cb, opiton = {immediate: false}) => {

    let getter;

    if (typeof source === 'function') {
        getter = source
    } else {
        getter = () => {
            return traverse(source);
        }
    }

    let oldValue, newValue;

    const scheduler = function () {
        newValue = effectFn();
        cb(oldValue, newValue)
        oldValue = newValue;
    }
    

    let effectFn = effect(getter, {
        lazy: true,
        scheduler: scheduler
    })

    if (opiton.immediate) {
        scheduler()
    } else {
        oldValue = effectFn()
    }
};