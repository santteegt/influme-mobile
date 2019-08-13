import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { InboxdetailComponent } from "./inboxdetail.component";

const routes: Routes = [
    { path: "", component: InboxdetailComponent }
];


@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class InboxdetailRoutingModule { }
