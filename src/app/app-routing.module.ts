import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const initarray = [];

const routes: Routes = [
    { path: "", redirectTo: "/viewmap", pathMatch: "full" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "viewmap", loadChildren: "~/app/viewmap/viewmap.module#ViewmapModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "filtermap", loadChildren: "~/app/filtermap/filtermap.module#FiltermapModule"},
    { path: "markerprofile", loadChildren: "~/app/markerprofile/markerprofile.module#MarkerprofileModule"},
    { path: "readqr", loadChildren: "~/app/readqr/readqr.module#ReadqrModule"},
    { path: "dealprofile", loadChildren: "~/app/dealprofile/dealprofile.module#DealprofileModule"},
    { path: "user", loadChildren: "~/app/user/user.module#UserModule" },
    { path: "profile", loadChildren: "~/app/profile/profile.module#ProfileModule" },    
    { path: "interest", loadChildren: "~/app/interest/interest.module#InterestModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "hotdeals", loadChildren: "~/app/hotdeals/hotdeals.module#HotdealsModule" },
    { path: "profilevisited", loadChildren: "~/app/profilevisited/profilevisited.module#ProfilevisitedModule" }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
