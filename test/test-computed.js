import computed from '../src/computed.js';
import {Reactive, effect} from '../src/index.js';

const data = {
    count: 0
}

const obj = Reactive(data)

const computedCount = computed(() => {
    const result = obj.count + 'count'
    return result
})

effect(() => {
    console.log(computedCount.value, 'effect');
})

console.log(obj.count++);
