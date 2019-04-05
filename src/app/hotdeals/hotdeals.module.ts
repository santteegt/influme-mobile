import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { HotdealsRoutingModule } from './hotdeals-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { HotdealsComponent } from './hotdeals.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [HotdealsComponent],
  imports: [
    HotdealsRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HotdealsModule { }
