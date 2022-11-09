import {Reactive, effect} from '../src/index.js';

const data = {
    count: 0
}

const obj = Reactive(data)

let jobList = new Set() // 使用set去重

let p = Promise.resolve()

let isFlushing = false;

function flushJob () {
    if (isFlushing) return;
    isFlushing = true
    p.then(() => {
        jobList.forEach(fn => fn())
    }).finally(() => {
        isFlushing = false
    })
}

effect(function() {
    console.log('change-result', obj.count);
},
{
    scheduler(fn) {
        jobList.add(fn)
        flushJob()
    }
});

obj.count++
obj.count++
