import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FiltermapRoutingModule } from './filtermap-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FiltermapComponent } from './filtermap.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [FiltermapComponent],
  imports: [
    FiltermapRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FiltermapModule { }
