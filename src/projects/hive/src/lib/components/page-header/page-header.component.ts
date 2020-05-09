import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  HostBinding,
  ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { IHiveMenu } from 'projects/hive/src/lib/types';
import { HiveMenuService } from 'projects/hive/src/lib/services';
// TODO: Change host with @HostListener
@Component({
  selector: 'hive-page-header',
  host: { class: 'hive-page-header' },
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input() showBreadCrumb = true;
  private unsubscribeAll: Subject<any>;
  navigation: IHiveMenu[] = [];

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private hiveMenuService: HiveMenuService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1];
  }

  genBreadcrumb() {
    const states = this.router.url.slice(1).split('/');
    // this.nav = this.menuService.getMenuLevel(states);
    // this.nav.unshift('home');
  }
}
