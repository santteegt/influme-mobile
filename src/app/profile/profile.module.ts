import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ProfileComponent } from './profile.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ProfileRoutingModule,
    NativeScriptCommonModule,
	SharedModule    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
