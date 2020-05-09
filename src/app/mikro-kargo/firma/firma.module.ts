import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FirmaEkleComponent } from "./firma-ekle/firma-ekle.component";
import { FirmaListesiComponent } from "./firma-listesi/firma-listesi.component";
import { FirmaKullaniciEkleComponent } from "./firma-kullanici-ekle/firma-kullanici-ekle.component";
import { FirmaKullaniciListesiComponent } from "./firma-kullanici-listesi/firma-kullanici-listesi.component";

const routes: Routes = [
  { path: "", redirectTo: "listesi", pathMatch: "full" },
  {
    path: "listesi",
    component: FirmaListesiComponent,
    data: { title: "Firma Listesi", titleI18n: "firmalistesi" }
  },
  {
    path: "ekle",
    component: FirmaEkleComponent,
    data: { title: "Firma Ekle", titleI18n: "firmaekle" }
  },
  {
    path: "kullaniciekle",
    component: FirmaKullaniciEkleComponent,
    data: { title: "Firma Kullanıcı Ekle", titleI18n: "firmakullaniciekle" }
  },
  {
    path: "kullanicilistesi",
    component: FirmaKullaniciListesiComponent,
    data: {
      title: "Firma Kullanıcı Listesi",
      titleI18n: "firmakullanicilisetsi"
    }
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    FirmaEkleComponent,
    FirmaListesiComponent,
    FirmaKullaniciEkleComponent,
    FirmaKullaniciListesiComponent,
    DashboardComponent
  ]
})
export class FirmaModule {}
