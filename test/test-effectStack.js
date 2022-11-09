import {Reactive, effect} from '../src/index.js';

const data = {
    father: 'hello',
    son: 'limingxin',
    isUseText: true,
}

const obj = Reactive(data)

let fatherResult = '';
let sonResult = '';

effect(function() {
    fatherResult = obj.father
    effect(function() {
        sonResult = obj.son
        console.log('change-son', sonResult);
    })
    console.log('change-father', fatherResult);
})


setTimeout(() => {
    obj.father = 'iloveu'
}, 1000)