import {
    Component,
    HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { customAnimations } from 'projects/hive/src/lib/types/animations';
import {
    HiveConfigService,
    HiveMenuService,
    HiveSidebarService
} from 'projects/hive/src/lib/services';
import { IHiveConfig } from 'projects/hive/src/lib/types';

@Component({
    selector: 'hive-theme-options',
    templateUrl: './theme-options.component.html',
    styleUrls: ['./theme-options.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: customAnimations
})
export class HiveThemeOptionsComponent implements OnInit, OnDestroy {
    appConfig: IHiveConfig;
    form: FormGroup;

    @HostBinding('class.bar-closed')
    barClosed: boolean;

    // Private
    private unsubscribeAll: Subject<any>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private formBuilder: FormBuilder,
        private hiveConfigService: HiveConfigService,
        private hiveMenuService: HiveMenuService,
        private hiveSidebarService: HiveSidebarService,
        private renderer: Renderer2
    ) {
        // Set the defaults
        this.barClosed = true;

        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Build the config form noinspection TypeScriptValidateTypes
        this.form = this.formBuilder.group({
            appName: new FormControl(),
            theme: new FormControl(),
            colorTheme: new FormControl(),
            customScrollbars: new FormControl(),
            layout: this.formBuilder.group({
                style: new FormControl(),
                width: new FormControl(),
                navbar: this.formBuilder.group({
                    primaryBackground: new FormControl(),
                    secondaryBackground: new FormControl(),
                    folded: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl(),
                    variant: new FormControl()
                }),
                toolbar: this.formBuilder.group({
                    background: new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl()
                }),
                footer: this.formBuilder.group({
                    background: new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl()
                }),
                sidepanel: this.formBuilder.group({
                    hidden: new FormControl(),
                    position: new FormControl()
                })
            }),
            dir: new FormControl()
        });

        // Subscribe to the config changes
        this.hiveConfigService.config
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((config: IHiveConfig) => {
                // Update the stored config
                this.appConfig = config;

                // Set the config form values without emitting an event
                // so that we don't end up with an infinite loop
                this.form.setValue(config, {emitEvent: false});
            });

        // Subscribe to the specific form value changes (layout.style)
        this.form
            .get('layout.style')
            .valueChanges.pipe(takeUntil(this.unsubscribeAll))
            .subscribe(value => {
                // Reset the form values based on the
                // selected layout style
                this._resetFormValues(value);
            });

        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((config: IHiveConfig) => {
                // Update the config
                this.hiveConfigService.config = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();

        // Remove the custom function menu
        this.hiveMenuService.removeNavigationItem('custom-function');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    private _resetFormValues(value: any): void {
        switch (value) {
            // Vertical Layout #1
            case 'vertical-1': {
                this.form.patchValue({
                    layout: {
                        width: 'fullwidth',
                        navbar: {
                            primaryBackground: 'hive-navy-700',
                            secondaryBackground: 'hive-navy-900',
                            folded: false,
                            hidden: false,
                            position: 'left',
                            variant: 'vertical-style-1'
                        },
                        toolbar: {
                            background: 'hive-white-500',
                            customBackgroundColor: false,
                            hidden: false,
                            position: 'below-static'
                        },
                        footer: {
                            background: 'hive-navy-900',
                            customBackgroundColor: true,
                            hidden: false,
                            position: 'below-static'
                        },
                        sidepanel: {
                            hidden: false,
                            position: 'right'
                        }
                    }
                });

                break;
            }

            // Vertical Layout #2
            case 'vertical-2': {
                this.form.patchValue({
                    layout: {
                        width: 'fullwidth',
                        navbar: {
                            primaryBackground: 'hive-navy-700',
                            secondaryBackground: 'hive-navy-900',
                            folded: false,
                            hidden: false,
                            position: 'left',
                            variant: 'vertical-style-1'
                        },
                        toolbar: {
                            background: 'hive-white-500',
                            customBackgroundColor: false,
                            hidden: false,
                            position: 'below'
                        },
                        footer: {
                            background: 'hive-navy-900',
                            customBackgroundColor: true,
                            hidden: false,
                            position: 'below'
                        },
                        sidepanel: {
                            hidden: false,
                            position: 'right'
                        }
                    }
                });

                break;
            }

            // Vertical Layout #3
            case 'vertical-3': {
                this.form.patchValue({
                    layout: {
                        width: 'fullwidth',
                        navbar: {
                            primaryBackground: 'hive-navy-700',
                            secondaryBackground: 'hive-navy-900',
                            folded: false,
                            hidden: false,
                            position: 'left',
                            layout: 'vertical-style-1'
                        },
                        toolbar: {
                            background: 'hive-white-500',
                            customBackgroundColor: false,
                            hidden: false,
                            position: 'above-static'
                        },
                        footer: {
                            background: 'hive-navy-900',
                            customBackgroundColor: true,
                            hidden: false,
                            position: 'above-static'
                        },
                        sidepanel: {
                            hidden: false,
                            position: 'right'
                        }
                    }
                });

                break;
            }

            // Horizontal Layout #1
            case 'horizontal-1': {
                this.form.patchValue({
                    layout: {
                        width: 'fullwidth',
                        navbar: {
                            primaryBackground: 'hive-navy-700',
                            secondaryBackground: 'hive-navy-900',
                            folded: false,
                            hidden: false,
                            position: 'top',
                            variant: 'vertical-style-1'
                        },
                        toolbar: {
                            background: 'hive-white-500',
                            customBackgroundColor: false,
                            hidden: false,
                            position: 'above'
                        },
                        footer: {
                            background: 'hive-navy-900',
                            customBackgroundColor: true,
                            hidden: false,
                            position: 'above-fixed'
                        },
                        sidepanel: {
                            hidden: false,
                            position: 'right'
                        }
                    }
                });

                break;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key: any): void {
        this.hiveSidebarService.getSidebar(key).toggleOpen();
    }
}
