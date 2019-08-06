export const menus = [
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
                name: 'Fixed',
                icon: {
                    mat: 'filter_list',
                    fa: false,
                },
                link: 'tables/fixed',
                open: false,
            },
            {
                translate: 'SIDEBAR.MENU.DASHBOARD',
                name: 'Feature',
                icon: {
                    mat: 'done_all',
                    fa: false,
                },
                link: 'tables/featured',
                open: false,
            },
            {
                translate: 'SIDEBAR.MENU.DASHBOARD',
                name: 'Responsive Tables',
                icon: {
                    mat: 'filter_center_focus',
                    fa: false,
                },
                link: 'tables/responsive',
                open: false,
            }
        ]

    },

];
