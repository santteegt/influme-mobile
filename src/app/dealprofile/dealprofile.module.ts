import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { DealprofileRoutingModule } from './dealprofile-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { DealprofileComponent } from './dealprofile.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [DealprofileComponent],
  imports: [
    DealprofileRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DealprofileModule { }
