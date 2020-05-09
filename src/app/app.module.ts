import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "", redirectTo: "mikro-kargo", pathMatch: "full" },
  {
    path: "mikro-kargo",
    loadChildren: () =>
      import("./mikro-kargo/mikro-kargo.module").then(m => m.MikroKargoModule),
    data: { title: "Authentication", titleI18n: "authentication" }
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
