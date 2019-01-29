import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ReadqrComponent } from "./readqr.component";

const routes: Routes = [
    { path: "", component: ReadqrComponent }
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ReadqrRoutingModule { }
