import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";

@Injectable()
export class LoggedInLazyLoadGuard implements CanLoad {

	private firstTime: boolean;
    constructor(private _routerExtensions: RouterExtensions) { 
    	this.firstTime = false;
    }

    canLoad(): boolean {
        let initparam = [];
    	if(!this.firstTime) {
            let navigationExtras: NavigationExtras = {
                queryParams: 
                {
                    "DataList": JSON.stringify(initparam)
                }
            };
    		// this._routerExtensions.navigate(["login"], { clearHistory: true });
            this._routerExtensions.navigate(["viewmap"], navigationExtras);

    		this.firstTime = true;
    	}
        return true;
    }
}