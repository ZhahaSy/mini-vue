import { effect, track, trigger } from './effect.js';

export default function computed(fn) {
    let value;

    let dirty = true;

    const effctFn = effect(fn, {
        lazy:  true,
        scheduler: function() {
            
            dirty = true
            trigger(result, value)
        }
    })

    const result = {
        get value () {
            console.log('get');
            if (dirty) {
                value = effctFn()
                dirty = false
            }
            track(result, value)
            return value
        }
    }
    return result
}
