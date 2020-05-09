import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const COMPONENTS = [];
@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class HiveModuleModule {}
