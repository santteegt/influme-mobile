import { Component } from "@angular/core";
// import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { NavigationExtras } from "@angular/router";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    optfilt: any;

    constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.className = "page-login-container";
        this.page.statusBarStyle = "dark";
    }

    login() {
        // if (Kinvey.User.getActiveUser() == null) {
        //     Kinvey.User.loginWithMIC()
        //         .then((user: Kinvey.User) => {
        //             this.navigateHome();
        //             console.log("user: " + JSON.stringify(user));
        //         })
        //         .catch((error: Kinvey.BaseError) => {
        //             alert("An error occurred. Check your Kinvey settings.");
        //             console.log("error: " + error);
        //         });
        // } else {
        //     this.navigateHome();
        // }
        this.navigateHome();
    }

    private navigateHome() {
        this.optfilt = []
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "DataList": JSON.stringify(this.optfilt)
          }
        };
        // this._routerExtensions.navigate(["viewmap", this.optfilt]);
        this.zone.run(() => {
            this._routerExtensions.navigate(["viewmap"], navigationExtras )
            // {
            //     clearHistory: true,
            //     animated: true,
            //     transition: {
            //         name: "slideTop",
            //         duration: 350,
            //         curve: "ease"
            //     }
            // });
        });
    }

    // private navigateHome() {
    //     this.zone.run(() => {
    //         this._routerExtensions.navigate(["home"], {
    //             clearHistory: true,
    //             animated: true,
    //             transition: {
    //                 name: "slideTop",
    //                 duration: 350,
    //                 curve: "ease"
    //             }
    //         });
    //     });
    // }
}
