import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MarkerprofileRoutingModule } from './markerprofile-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { MarkerprofileComponent } from './markerprofile.component';

@NgModule({
  declarations: [MarkerprofileComponent],
  imports: [
    MarkerprofileRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MarkerprofileModule { }
