import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { UserComponent } from './user.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
