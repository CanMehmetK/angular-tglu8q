import { NgModule } from "@angular/core";

import {
  DxDataGridModule,
  DxTreeListModule,
  DxHtmlEditorModule
} from "devextreme-angular";

@NgModule({
  exports: [DxDataGridModule, DxTreeListModule, DxHtmlEditorModule]
})
export class DevExtremeModule {}
