import {Reactive, effect} from '../src/index.js';

const data = {
    text: 'hello',
    name: 'limingxin',
    isUseText: true,
}

const obj = Reactive(data)

let result = '';

effect(function() {
    result = obj.isUseText ? obj.text : '不用Text'
    console.log('change-result', result);
})


setTimeout(() => {
    obj.isUseText = false
}, 1000)

setTimeout(() => {
    obj.text = 'Hi～'
}, 1000)