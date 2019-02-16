import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
// import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { NavigationExtras } from "@angular/router";
import { Auth0 } from 'nativescript-auth0';
import * as jwt from "jwt-decode";
import * as localstorage from "nativescript-localstorage";

@Component({
    selector: "Login",
    moduleId: module.id,
    styleUrls: ['./login.component.css'],
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    optfilt: any;
    private auth0: Auth0;
    // private lstore: NLocalStorage;
    private jsonFinal: any;

    // constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
    constructor(private _routerExtensions: RouterExtensions, private page: Page) {
        this.page.actionBarHidden = true;
        // this.page.backgroundSpanUnderStatusBar = true;

        // this.page.className = "page-login-container";
        // this.page.statusBarStyle = "dark";
        this.auth0 = new Auth0('u5l96Kp3uEDJ7PSfhH56WyHIJe4PaiXd', 'devappmobile.auth0.com');
    }

    login() {
        /// Promise returns credentials object
        this.auth0.webAuthentication({
            scope: 'openid profile email bio offline_access', scheme: "influmemobile"
        }).then((result) => {            
        // console.log(result);
            
            this.navigateUser(result);  
        }).catch((e: Error) => console.log(e, e.stack));
        //this.navigateHome();
        //this.navigateUser("res");
    }

    private navigateHome() {
        this.optfilt = []
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "DataList": JSON.stringify(this.optfilt)
          }
        };
        // this._routerExtensions.navigate(["viewmap", this.optfilt]);
        // this.zone.run(() => {
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
        // });
    }

    private navigateUser(res) {

        // this.auth0.getUserInfo(res['accessToken']).then((result) => {            
        //     alert(JSON.stringify(result));
        //     // console.log("[***] Informacion de Usuario " + result);
        //     // console.log("[***] Informacion de Usuario " + result.pictureURL);
        //     // console.log("[***] Informacion de Usuario " + result.name);
        //     // console.log("[***] Informacion de Usuario " + result.nickname);
        //     // console.log("[***] Informacion de Usuario " + result.counts);
        //     // console.log("[***] Informacion de Usuario " + result.follows);
        // }).catch((e: Error) => console.log(e, e.stack));        

        console.log('[*] Access Token: ' + res['accessToken']);
        
        console.log('[*] Todo el resultado: ' + JSON.stringify(res));
        
        const usuario: string = jwt(res['idToken']);
        // const usuario: string = "";

        //console.log("luego del decode");
        // console.log ("[*] Data res[idToken]: " + JSON.stringify(usuario));
        // this.zone.run(() => {

        this.jsonFinal = {
            "profile": usuario,
            "security": res
        }

        localstorage.setItem('ResultLogin', JSON.stringify(this.jsonFinal));                        

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "info": JSON.stringify(usuario)
          }
        };

        this._routerExtensions.navigate(["user"], navigationExtras );
            // {
            //     clearHistory: false,
            //     animated: true,
            //     transition: {
            //         name: "slideTop",
            //         duration: 350,
            //         curve: "ease"
            //     }
            // });
        // });
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
    private routeMap() {
        let empty_value = [];
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "DataList": JSON.stringify(empty_value)
          }
        };
        
        this._routerExtensions.navigate(["viewmap"], navigationExtras );

  }
}
