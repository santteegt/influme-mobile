import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
// import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class LoggedInLazyLoadGuard implements CanLoad {

	private firstTime: boolean;
    constructor(private _routerExtensions: RouterExtensions) { 
    	this.firstTime = false;
    }

    canLoad(): boolean {
    	if(!this.firstTime) {
    		this._routerExtensions.navigate(["login"], { clearHistory: true });
    		this.firstTime = true;
    	}
        // if (!Kinvey.User.getActiveUser()) {
        //     this._routerExtensions.navigate(["login"], { clearHistory: true });
        // }
        return true;
    }
}