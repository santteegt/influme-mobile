import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FollowingextendedRoutingModule } from './followingextended-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { FollowingextendedComponent } from './followingextended.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [FollowingextendedComponent],
  imports: [
    FollowingextendedRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FollowingextendedModule { }
