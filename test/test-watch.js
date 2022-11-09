import {Reactive} from '../src/index.js';
import watch from '../src/watch.js';

// watch
const data = {
    a: {}
}

const obj = Reactive(data);

watch(() => obj.a, (oldValue, newValue) => {
    console.log('aaaa');
    console.log(oldValue, newValue);
}, {
    immediate: true
});
obj.a = 3