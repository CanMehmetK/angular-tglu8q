import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders
} from '@angular/core';

import {
    CommonModule,
    LocationStrategy,
    PathLocationStrategy
} from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { RouteReusableStrategy } from 'projects/hive/src/lib/route-reusable-strategy';

import { ErrorHandlerInterceptor } from 'projects/hive/src/lib/http/error-handler.interceptor';
import { ApiPrefixInterceptor } from 'projects/hive/src/lib/http/api-prefix.interceptor';
import { DefaultInterceptor } from 'projects/hive/src/lib/http/default.interceptor';

import { IHiveConfig } from 'projects/hive/src/lib/types/hive-config';
import { HIVE_CONFIG } from 'projects/hive/src/lib/services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//#region  THIRD_MODULES ------------------------------------------
import { MaterialModule } from 'projects/hive/src/lib/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const THIRD_MODULES = [FlexLayoutModule];
//#endregion

//#region  COMPONENTS ------------------------------------------
import { LoaderComponent } from './components/loader/loader.component';
import { HiveThemeOptionsComponent } from './components/theme-options/theme-options.component';
import { ThemeColorComponent } from './components/theme-options/theme-color/theme-color.component';
import { HiveSidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
const COMPONENTS = [
    PageHeaderComponent,
    BreadcrumbComponent,
    LoaderComponent,
    HiveThemeOptionsComponent,
    ThemeColorComponent,
    HiveSidebarComponent,
    ModalComponent
];
//#endregion

//#region  DIRECTIVES ------------------------------------------
import { HiveCustomScrollDirective } from 'projects/hive/src/lib/directives/hive-customscroll.directive';
import {
    HiveSidenavDirective,
    HiveSidenavTogglerDirective
} from 'projects/hive/src/lib/directives/hive-sidenav.directive';

const DIRECTIVES = [
    HiveCustomScrollDirective,
    HiveSidenavDirective,
    HiveSidenavTogglerDirective
];
//#endregion

//#region  PIPES ------------------------------------------
import { KeysPipe } from 'projects/hive/src/lib/pipes/keys.pipe';
import { GetByIdPipe } from 'projects/hive/src/lib/pipes/getById.pipe';
import { HtmlToPlaintextPipe } from './pipes/htmlToPlaintext.pipe';
import { FilterPipe } from 'projects/hive/src/lib/pipes/filter.pipe';
import { CamelCaseToDashPipe } from 'projects/hive/src/lib/pipes/camelCaseToDash.pipe';

const PIPES = [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe
];
//#endregion

import * as moment from 'moment';
import 'moment/locale/tr';
import {
    MAT_DATE_LOCALE,
    DateAdapter,
    MAT_DATE_FORMATS
} from '@angular/material/core';
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';



export const MY_FORMATS = {
    parse: {dateInput: 'DD.MM.YYYY'},
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@NgModule({
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        ...THIRD_MODULES,
        FormsModule
    ],
    exports: [
        // third libs
        ...THIRD_MODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {provide: RouteReuseStrategy, useClass: RouteReusableStrategy},
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        [
            {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
            {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
            }
        ],
        {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        Location
    ]
})
export class HiveModule {
}

@NgModule({})
export class HiveCoreModule {
    static forRoot(config: IHiveConfig): ModuleWithProviders<HiveCoreModule> {
        return {
            ngModule: HiveCoreModule,
            providers: [{provide: HIVE_CONFIG, useValue: config}]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: HiveCoreModule) {
        // Import guard
        if (parentModule) {
            throw new Error(
                `Hive Core has already been loaded. Import Core module in the AppModule only.`
            );
        }
    }
}
