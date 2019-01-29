import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { MarkerprofileComponent } from "./markerprofile.component";

const routes: Routes = [
    { path: "", component: MarkerprofileComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class MarkerprofileRoutingModule { }
