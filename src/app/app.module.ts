import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
// import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        // NativeScriptLocalizeModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        LoggedInLazyLoadGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
