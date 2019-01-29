import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { DealprofileComponent } from "./dealprofile.component";

const routes: Routes = [
    { path: "", component: DealprofileComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class DealprofileRoutingModule { }
