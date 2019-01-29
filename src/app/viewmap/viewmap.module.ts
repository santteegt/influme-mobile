import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ViewmapRoutingModule } from './viewmap-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ViewmapComponent } from './viewmap.component';

import { SharedModule } from "../shared/shared.module";

import * as platform from "platform";
declare var GMSServices: any;

if(platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyBD71DgYMShdu8PD0x7waGLBPBgZjAZKes");
}

@NgModule({
  declarations: [ViewmapComponent],
  imports: [
    ViewmapRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewmapModule { }
