import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const initarray = [];

const routes: Routes = [
    { path: "", redirectTo: "/viewmap", pathMatch: "full" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "viewmap", loadChildren: "~/app/viewmap/viewmap.module#ViewmapModule", canLoad: [LoggedInLazyLoadGuard] },
    // { path: "viewmap/:optionfilter", loadChildren: "~/app/viewmap/viewmap.module#ViewmapModule" },
    // { path: "viewmap/:optionfilter", loadChildren: "~/app/viewmap/viewmap.module#ViewmapModule" },
    { path: "filtermap", loadChildren: "~/app/filtermap/filtermap.module#FiltermapModule"},
    { path: "markerprofile", loadChildren: "~/app/markerprofile/markerprofile.module#MarkerprofileModule"},
    { path: "readqr", loadChildren: "~/app/readqr/readqr.module#ReadqrModule"},
    { path: "dealprofile", loadChildren: "~/app/dealprofile/dealprofile.module#DealprofileModule"}    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
