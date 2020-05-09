import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Constructor
   *
   * @param {MediaObserver} mediaObserver
   */
  constructor(private mediaObserver: MediaObserver) {
    // Set the defaults
    this.activeMediaQuery = '';

    // Initialize
    this._init();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Initialize
   *
   * @private
   */
  private _init(): void {
    this.mediaObserver.media$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((change: MediaChange) => {
      if (this.activeMediaQuery !== change.mqAlias) {
        this.activeMediaQuery = change.mqAlias;
        this.onMediaChange.next(change.mqAlias);
      }
    });
  }
}
