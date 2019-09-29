import {MenuItem} from 'src/app/core/domains';


const menuItems: MenuItem[] = [
    {
        translate: 'SIDEBAR.MENU.DASHBOARD',
        name: 'Dashboard',
        icon: {
            mat: 'dashboard',
            fa: false
        },
        link: '/dashboard',
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
                link: '/store/regions',
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
                name: 'Medias',
                link: '/store/medias',
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
                link: '/store/orders/status',
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
                name: 'Payments Modes',
                link: '/store/payments/modes',
                icon: {
                    mat: false,
                    fa: 'money-check'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Phones',
                link: '/store/phones',
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
                name: 'Users Roles',
                link: '/store/users/roles',
                icon: {
                    mat: false,
                    fa: 'user-tag'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Countries',
                link: '/store/countries',
                icon: {
                    mat: false,
                    fa: 'flag'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Departments',
                link: '/store/departments',
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
                name: 'Districts',
                link: '/store/districts',
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
                name: 'Towns',
                link: '/store/towns',
                icon: {
                    mat: false,
                    fa: 'city'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Addresses',
                link: '/store/addresses',
                icon: {
                    mat: false,
                    fa: 'address_book'
                },
                chip: false,
                open: false,
                sub: false
            },
            {
                translate: 'SIDEBAR.MENU.STORE',
                name: 'Menus',
                link: '/store/menus',
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
                name: 'Orders',
                link: '/store/orders',
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
                name: 'Payments',
                link: '/store/payments',
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
                name: 'Restaurant',
                link: '/store/restaurants',
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
                name: 'Restaurants Menus',
                link: '/store/restaurants/menus',
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
                name: 'User',
                link: '/store/users',
                icon: {
                    mat: false,
                    fa: 'users'
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
                link: '/store/departments',
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

