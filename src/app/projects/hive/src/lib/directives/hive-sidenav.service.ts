import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class HiveSidenavService {
  sidenavInstances: MatSidenav[];

  /**
   * Constructor
   */
  constructor() {
    this.sidenavInstances = [];
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------


  setSidenav(id, instance): void {
    this.sidenavInstances[id] = instance;
  }


  getSidenav(id): any {
    return this.sidenavInstances[id];
  }
}
