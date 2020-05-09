import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { MaterialModule } from "../material.module";
const COMPONENTS = [LayoutComponent];
const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "",
    component: LayoutComponent,
    children: []
  }
];
@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [...COMPONENTS]
})
export class MikroKargoModule {}
