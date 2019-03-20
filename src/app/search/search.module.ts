import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchRoutingModule } from './search-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SearchComponent } from './search.component';

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SearchRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
