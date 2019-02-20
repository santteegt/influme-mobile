import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { InterestRoutingModule } from './interest-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { InterestComponent } from './interest.component';

@NgModule({
  declarations: [InterestComponent],
  imports: [
    InterestRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InterestModule { }
