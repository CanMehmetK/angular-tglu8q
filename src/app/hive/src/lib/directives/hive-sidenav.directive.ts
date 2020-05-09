import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatchMediaService } from '../services/match-media.service';
import { HiveSidenavService } from 'projects/hive/src/lib/directives/hive-sidenav.service';



@Directive({
  selector: '[hiveSidenav]',
})
export class HiveSidenavDirective implements OnInit, OnDestroy {
  @HostBinding('class.mat-is-locked-open')
  isLockedOpen: boolean;

  @Input()
  hiveSidenav: string;

  @Input()
  matIsLockedOpen: string;

  // Private
  private _unsubscribeAll: Subject<any>;


  constructor(
    private _hiveMatchMediaService: MatchMediaService,
    private _hiveSidenavService: HiveSidenavService,
    private _matSidenav: MatSidenav,
    private _mediaObserver: MediaObserver
  ) {
    // Set the defaults
    this.isLockedOpen = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Register the sidenav to the service
    this._hiveSidenavService.setSidenav(this.hiveSidenav, this._matSidenav);

    if (this.matIsLockedOpen && this._mediaObserver.isActive(this.matIsLockedOpen)) {
      this.isLockedOpen = true;
      this._matSidenav.mode = 'side';
      this._matSidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this._matSidenav.mode = 'over';
      this._matSidenav.toggle(false);
    }

    this._hiveMatchMediaService.onMediaChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      if (this.matIsLockedOpen && this._mediaObserver.isActive(this.matIsLockedOpen)) {
        this.isLockedOpen = true;
        this._matSidenav.mode = 'side';
        this._matSidenav.toggle(true);
      } else {
        this.isLockedOpen = false;
        this._matSidenav.mode = 'over';
        this._matSidenav.toggle(false);
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

@Directive({
  selector: '[hiveSidenavToggler]',
})
export class HiveSidenavTogglerDirective {
  @Input()
  hiveSidenavToggler: string;

  /**
   * Constructor
   *
   * @param {HiveSidenavService} _hiveSidenavService
   */
  constructor(private _hiveSidenavService: HiveSidenavService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On click
   */
  @HostListener('click')
  onClick(): void {
    this._hiveSidenavService.getSidenav(this.hiveSidenavToggler).toggle();
  }
}
