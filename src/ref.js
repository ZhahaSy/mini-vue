import { track, trigger } from "./effect"
import { Reactive } from "./reactive"

class RefImpl {
    static __v_isRef = true
    constructor(val) {
        this._value = val
        this._rawValue = JSON.parse(JSON.stringify(val))

        this.dep = new Set()
    }
    get value () {
        track(this.dep)
        return this._value
    }
    set value (newValue) {
        this._value = convert(newValue)
        this._rawValue = JSON.parse(JSON.stringify(newValue))
        trigger(this.dep)
    }
}

function convert(value) {
    return isObject(value) ? new Reactive(value) : value;
  }

export function ref(val) {
    return new RefImpl(val)
}


export function isRef(value) {
    return !!value.__v_isRef;
}
export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}