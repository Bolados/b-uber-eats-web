import {Theme} from '../domains/enums/theme.enums';

export abstract class ThemeTools {

    public static keys(): Array<string> {
        const keys = Object.keys(Theme);
        return keys.slice(0, keys.length);  // - 2 );
    }

    public static values(): Array<string> {
        return ThemeTools.keys().map(el => Object(Theme)[el]);
    }

}
