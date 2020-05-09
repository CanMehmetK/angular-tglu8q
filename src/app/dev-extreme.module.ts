import { NgModule } from "@angular/core";

import {
  DxDataGridModule,
  DxTemplateModule,
  DxTreeListModule,
  DxHtmlEditorModule
} from "devextreme-angular";

@NgModule({
  exports: [
    DxDataGridModule,
    DxTemplateModule,
    DxTreeListModule,
    DxHtmlEditorModule
  ]
})
export class DevExtremeModule {}
