import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MarkerprofileRoutingModule } from './markerprofile-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { MarkerprofileComponent } from './markerprofile.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [MarkerprofileComponent],
  imports: [
    MarkerprofileRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MarkerprofileModule { }
