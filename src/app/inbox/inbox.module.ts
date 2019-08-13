import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { InboxRoutingModule } from './inbox-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { InboxComponent } from './inbox.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [InboxComponent],
  imports: [
    InboxRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InboxModule { }
