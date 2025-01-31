import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { FollowingextendedComponent } from "./followingextended.component";

const routes: Routes = [
    { path: "", component: FollowingextendedComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class FollowingextendedRoutingModule { }
