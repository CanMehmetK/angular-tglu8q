export interface IHiveConfig {
    appName: string;
    theme?: 'light' | 'dark';
    colorTheme: string;
    customScrollbars: boolean;
    layout: {
        style: string;
        width: 'fullwidth' | 'boxed';
        navbar: {
            primaryBackground: string;
            secondaryBackground: string;
            hidden: boolean;
            folded: boolean;
            position: 'left' | 'right' | 'top';
            variant: string;
            showUserPanel?: boolean;
            sidenavOpened?: boolean;
            sidenavCollapsed?: boolean;
        };
        toolbar: {
            customBackgroundColor: boolean;
            background: string;
            hidden: boolean;
            position:
                | 'above'
                | 'above-static'
                | 'above-fixed'
                | 'below'
                | 'below-static'
                | 'below-fixed';
        };
        footer: {
            customBackgroundColor: boolean;
            background: string;
            hidden: boolean;
            position:
                | 'above'
                | 'above-static'
                | 'above-fixed'
                | 'below'
                | 'below-static'
                | 'below-fixed';
        };
        sidepanel: {
            hidden: boolean;
            position: 'left' | 'right';
        };
    };
    // *********************** --
    navPos?: 'side' | 'top';
    dir?: 'ltr' | 'rtl';

    showHeader?: boolean;
    headerPos?: 'fixed' | 'static' | 'above';
    showUserPanel?: boolean;
    sidenavOpened?: boolean;
    sidenavCollapsed?: boolean;
    isOver?: boolean;


}
