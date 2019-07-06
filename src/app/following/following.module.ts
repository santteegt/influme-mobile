import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FollowingRoutingModule } from './following-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FollowingComponent } from './following.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [FollowingComponent],
  imports: [
    FollowingRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FollowingModule { }
