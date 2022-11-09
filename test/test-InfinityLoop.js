import {Reactive, effect} from '../src/index.js';

const data = {
    count: 0
}

const obj = Reactive(data)

effect(function() {
    obj.count++
    console.log('change-result', obj.count);
})