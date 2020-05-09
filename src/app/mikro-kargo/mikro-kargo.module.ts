import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: []}};
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class MikroKargoModule { }