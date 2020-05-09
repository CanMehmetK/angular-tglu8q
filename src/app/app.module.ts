import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "mikro-kargo",
    loadChildren: () =>
      import("./mikro-kargo/mikro-kargo.module").then(m => m.MikroKargoModule),
    data: { title: "Authentication", titleI18n: "authentication" }
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
