import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FollowerRoutingModule } from './follower-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FollowerComponent } from './follower.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [FollowerComponent],
  imports: [
    FollowerRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FollowerModule { }
