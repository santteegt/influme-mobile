import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { InterestRoutingModule } from './interest-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { InterestComponent } from './interest.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [InterestComponent],
  imports: [
    InterestRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InterestModule { }
