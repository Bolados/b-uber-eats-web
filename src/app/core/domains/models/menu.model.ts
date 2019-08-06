export class Menu {
    name: string;
    icon: string = null;
    link: string = null;
    open: boolean = false;
    chip: {
        value: string;
        color: string;
    } = null;
    sub: Array<Menu> = null;
}
