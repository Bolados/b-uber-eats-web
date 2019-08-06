export const menus = [
    {
        name: 'Dashboard',
        icon: {
            fa: false,
            mat: 'dashboard'
        },
        link: '/admin/dashboard',
        open: false,
        chip: false,
    },
    {
        name: 'Material Widget',
        icon: 'widgets',
        link: false,
        open: false,
        chip: false,
        sub: [
            {
                name: 'Buttons',
                link: 'material-widgets/buttons',
                icon: 'indeterminate_check_box',
                chip: false,
                open: false,
                sub: false
            },
            {
                name: 'List',
                link: 'material-widgets/list',
                icon: 'list',
                chip: false,
                open: false,
            },
            {

                name: 'Stepper',
                link: 'material-widgets/stepper',
                icon: 'view_week',
                chip: false,
                open: false,

            },
            {
                name: 'Expansion',
                link: 'material-widgets/expansion',
                icon: 'web_aaset',
                chip: false,
                open: false,
            },
            {
                name: 'Progress Spinner',
                link: 'material-widgets/spinner',
                icon: 'cached',
                chip: false,
                open: false,
            },
            {
                name: 'Cards',
                link: 'material-widgets/cards',
                icon: 'crop_16_9',
                chip: false,
                open: false,
            },
            {
                name: 'Icons',
                link: 'material-widgets/icons',
                icon: 'gif',
                chip: false,
                open: false,
            },
            {

                name: 'AutoComplete',
                link: 'material-widgets/autocomplete',
                icon: 'get_app',
                chip: false,
                open: false,
            },
            {
                name: 'CheckBox',
                link: 'material-widgets/checkbox',
                icon: 'check_box',
                chip: false,
                open: false,
            },
            {
                name: 'DatePicker',
                link: 'material-widgets/datepicker',
                icon: 'date_range',
                chip: false,
                open: false,
            },

            {
                name: 'Slider',
                link: 'material-widgets/slider',
                icon: 'keyboard_tab',
                chip: false,
                open: false,
            },
            {
                name: 'Slide Toggle',
                link: 'material-widgets/slide-toggle',
                icon: 'album',
                chip: false,
                open: false,
            },
            {
                name: 'Menu',
                icon: 'menu',
                link: 'material-widgets/menu',
                chip: false,
                open: false,
            },
            {
                name: 'Progress Bar',
                link: 'material-widgets/progress-bar',
                icon: 'trending_flat',
                chip: false,
                open: false,
            },
            {
                name: 'Input',
                icon: 'input',
                link: 'material-widgets/input',
                open: false,
            },
            {
                name: 'Radio',
                icon: 'radio_button_checked',
                link: 'material-widgets/radio',
                chip: false,
                open: false,
            },
            {
                name: 'Select',
                icon: 'select_all',
                link: 'material-widgets/select',
                open: false,
            },
        ]
    },
    {
        name: 'Tables',
        icon: 'list',
        link: false,
        open: false,
        chip: {value: 2, color: 'accent'},
        sub: [
            {
                name: 'Fixed',
                icon: 'filter_list',
                link: 'tables/fixed',
                open: false,
            },
            {
                name: 'Feature',
                icon: 'done_all',
                link: 'tables/featured',
                open: false,
            },
            {
                name: 'Responsive Tables',
                icon: 'filter_center_focus',
                link: 'tables/responsive',
                open: false,
            }
        ]

    },

];
