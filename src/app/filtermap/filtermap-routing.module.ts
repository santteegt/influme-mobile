import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { FiltermapComponent } from "./filtermap.component";

const routes: Routes = [
    { path: "", component: FiltermapComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class FiltermapRoutingModule { }
