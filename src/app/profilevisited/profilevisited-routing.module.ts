import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ProfilevisitedComponent } from "./profilevisited.component";

const routes: Routes = [
    { path: "", component: ProfilevisitedComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ProfilevisitedRoutingModule { }
