import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FiltermapRoutingModule } from './filtermap-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FiltermapComponent } from './filtermap.component';

@NgModule({
  declarations: [FiltermapComponent],
  imports: [
    FiltermapRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FiltermapModule { }
