import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { IHiveConfig } from '../types';

// Create the injection token for the custom settings
export const HIVE_CONFIG = new InjectionToken('hiveCustomConfig');

@Injectable({
  providedIn: 'root'
})
export class HiveConfigService {
  // Private
  private configSubject: BehaviorSubject<IHiveConfig>;
  private readonly defaultConfiguration: IHiveConfig;

  constructor(
    private platform: Platform,
    private router: Router,
    @Inject(HIVE_CONFIG) private configuration?: IHiveConfig
  ) {
    // Set the default config from the user provided config (from forRoot)
    this.defaultConfiguration = configuration;

    // Initialize the service
    this._init();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set and get the config
   */
  set config(value) {
    // Get the value from the behavior subject
    let config = this.configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // Notify the observers
    this.configSubject.next(config);
  }

  get config(): any | Observable<any> {
    return this.configSubject.asObservable();
  }

  get defaultConfig(): any {
    return this.defaultConfiguration;
  }

  private _init(): void {
    if (this.platform.ANDROID || this.platform.IOS) {
      this.defaultConfiguration.customScrollbars = false;
    }

    // Set the config from the default config
    this.configSubject = new BehaviorSubject(
      _.cloneDeep(this.defaultConfiguration)
    );

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this.router.events
      .pipe(filter(event => event instanceof ResolveEnd))
      .subscribe(() => {
        if (
          !_.isEqual(
            this.configSubject.getValue().layout,
            this.defaultConfiguration.layout
          )
        ) {
          // Clone the current config
          const config = _.cloneDeep(this.configSubject.getValue());

          // Reset the layout from the default config
          config.layout = _.cloneDeep(this.defaultConfiguration.layout);

          // Set the config
          this.configSubject.next(config);
        }
      });
  }

  setConfig(value: IHiveConfig, opts = { emitEvent: true }): void {
    // Get the value from the behavior subject
    let config = this.configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // If emitEvent option is true...
    if (opts.emitEvent === true) {
      // Notify the observers
      this.configSubject.next(config);
    }
  }
  setNavState(type: string, value: boolean) {
    this.configSubject.next({ type, value } as any);
  }
  getConfig(): Observable<IHiveConfig> {
    return this.configSubject.asObservable();
  }

  resetToDefaults(): void {
    // Set the config from the default config
    this.configSubject.next(_.cloneDeep(this.defaultConfig));
  }

  destroy() {
    if (this.configSubject) {
      this.configSubject.unsubscribe();
    }
  }
}
