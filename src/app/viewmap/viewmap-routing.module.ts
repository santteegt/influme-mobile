import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';


import { ViewmapComponent } from "./viewmap.component";

const routes: Routes = [
    { path: "", component: ViewmapComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ViewmapRoutingModule { }
