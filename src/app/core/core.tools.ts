export abstract class CoreTools {

    public static have(value): boolean {
        return !(this.isSame(value, null) || this.isSame(value, undefined));
    }

    static isSame(checker, value) {
        return checker === value;
    }

}

