import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { HotdealsComponent } from "./hotdeals.component";

const routes: Routes = [
    { path: "", component: HotdealsComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class HotdealsRoutingModule { }
