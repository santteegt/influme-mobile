import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfilevisitedRoutingModule } from './profilevisited-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ProfilevisitedComponent } from './profilevisited.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProfilevisitedComponent],
  imports: [
    ProfilevisitedRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfilevisitedModule { }
