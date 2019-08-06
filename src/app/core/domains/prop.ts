export function prop(target: Object, name: string) {
    Object.defineProperty(target, name, {
        get() {
            return this['_' + name];
        },
        set(value) {
            this['_' + name] = value;
        },
        enumerable: true,
        configurable: true
    });
}
