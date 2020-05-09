import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { HiveModule } from "../hive/src/lib/hive.module";
import { MaterialModule } from "../material.module";

import { LayoutComponent } from "./layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
const COMPONENTS = [LayoutComponent, DashboardComponent];

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { title: "Mikro Kargo", titleI18n: "dashboard" }
      },
      {
        path: "gonderi",
        loadChildren: () =>
          import("./gonderi/gonderi.module").then(m => m.GonderiModule),
        data: { title: "Mikro Kargo Gönderi", titleI18n: "mikrokargogonderi" }
      },
      {
        path: "firma",
        loadChildren: () =>
          import("./firma/firma.module").then(m => m.FirmaModule),
        data: { title: "Mikro Kargo Firma", titleI18n: "mikrokargofirma" }
      },
      {
        path: "alici",
        loadChildren: () =>
          import("./alici/alici.module").then(m => m.AliciModule),
        data: { title: "Mikro Kargo Alıcı", titleI18n: "mikrokargoalici" }
      },
      {
        path: "finans",
        loadChildren: () =>
          import("./finans/finans.module").then(m => m.FinansModule),
        data: { title: "Mikro Kargo Finans", titleI18n: "mikrokargofinans" }
      },
      {
        path: "rapor",
        loadChildren: () =>
          import("./rapor/rapor.module").then(m => m.RaporModule),
        data: { title: "Mikro Kargo Rapor", titleI18n: "mikrokargorapor" }
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    HiveModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [...COMPONENTS]
})
export class MikroKargoModule {}
