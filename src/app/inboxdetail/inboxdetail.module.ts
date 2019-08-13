import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { InboxdetailRoutingModule } from './inboxdetail-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { InboxdetailComponent } from './inboxdetail.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [InboxdetailComponent],
  imports: [
    InboxdetailRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InboxdetailModule { }
