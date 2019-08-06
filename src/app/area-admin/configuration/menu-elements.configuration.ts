import { MenuItem } from 'src/app/core/domains';


const menuItems: MenuItem[] = [
    {
        translate: 'SIDEBAR.MENU.DASHBOARD',
        name: 'Dashboard',
        icon: {
            mat: 'dashboard',
            fa: false
        },
        link: '/admin/dashboard',
        open: false,
        chip: false,
    },
    {
        translate: 'SIDEBAR.MENU.STORE',
        name: 'Store',
        icon: {
            mat: false,
            fa: 'database'
        },
        link: false,
        open: false,
        chip: {
            value: 10.,
            color: 'accent'
        },
        sub: [
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Regions',
                link: '/admin/store/regions',
                icon: {
                    mat: false,
                    fa: 'globe'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Media',
                link: '/admin/store/media',
                icon: {
                    mat: false,
                    fa: 'image'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Orders Status',
                link: '/admin/store/orders/status',
                icon: {
                    mat: false,
                    fa: 'question-circle'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Payment Mode',
                link: '/admin/store/payments/modes',
                icon: {
                    mat: false,
                    fa: 'question-circle'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Phone',
                link: '/admin/store/phones',
                icon: {
                    mat: false,
                    fa: 'phone'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Role',
                link: '/admin/store/users/roles',
                icon: {
                    mat: false,
                    fa: 'user-tag'
                },
                chip: false,
                open: false,
                sub: false
            },
        ]
    },
    {
        translate: 'SIDEBAR.MENU.DASHBOARD',
        name: 'Routes',
        icon: {
            mat: 'list',
            fa: false
        },
        link: false,
        open: false,
        chip: {
            value: 2,
            color: 'accent'
        },
        sub: [
            {
                translate: 'SIDEBAR.MENU.DASHBOARD',
                name: 'Departments',
                link: '/admin/store/departments',
                icon: {
                    mat: 'indeterminate_check_box',
                    fa: false
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.DASHBOARD',
                name: 'List',
                link: 'material-widgets/list',
                icon: {
                    mat: 'list',
                    fa: false
                },
                chip: false,
                open: false,
            },
        ]

    },

];

export function menu(): MenuItem[] {
    const items: MenuItem[] = menuItems;
    items.sort((a, b) => (a.name > b.name) ? 1 : -1);
    items.forEach(submenu => {
        if (submenu.sub) {
            submenu.sub.sort((a, b) => (a.name > b.name) ? 1 : -1);
            const chip = submenu.chip;
            const value = 'value';
            chip[value] = submenu.sub.length;
            submenu.chip =  chip;
        }
    });
    return items;
}

