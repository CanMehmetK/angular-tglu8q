import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { HiveMenuService } from 'projects/hive/src/lib/services';
import { Subject } from 'rxjs';
import { IHiveMenu } from 'projects/hive/src/lib/types';

@Component({
    selector: 'hive-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
    @Input() nav: string[] = [];
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
    }

    trackByNavlink(index: number, navlink: string): string {
        return navlink;
    }

    genBreadcrumb() {
        const states = this.router.url.slice(1).split('/');
        this.nav = states;
        this.nav = this.hiveMenuService.getMenuLevel(states);
        this.nav.unshift('home');
    }
}
