export interface MenuItem {
    translate: string;
    name: string;
    icon: {
        mat: string | false;
        fa: string | false;
    };
    link: string | false;
    open: boolean;
    chip: false | {
        value: number;
        color: string;
    };
    sub?: Array<MenuItem> | false;
}
