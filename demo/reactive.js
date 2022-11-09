const listMap = {};

let activeFn = null

const addList = (fn) => {
    fn();
    activeFn = fn;
}

const Reactive = (data) => new Proxy(data, {
    get(target, prop) {
       list = listMap[prop] ? listMap[prop] : listMap[prop] = []

       list.push(activeFn)
       
        console.log(prop, '被读取');
        return target[prop];
    },
    set(target, prop, value) {
        console.log(prop, '被修改为', value);
        target[prop] = value;

        listMap

        list.forEach(fn => {
            fn()
        });
        // 修改时， 更新响应语句
        return false;
    },
})





