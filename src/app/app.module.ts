import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

import { Data } from "./providers/data/data";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        // HttpModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        LoggedInLazyLoadGuard,
        Data
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
