import { Component, ElementRef, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page"
import { EventData } from "tns-core-modules/data/observable";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";

import { UserapiService } from "../shared/api/user/userapi.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public loggedUser: string;

    constructor(private _routerExtensions: RouterExtensions, private page: Page,
                private userApiService: UserapiService) {
        this.page.actionBarHidden = false;
    }

    ngOnInit(): void {
        this.loggedUser = 'influme';
    }

    logout() {
        this._routerExtensions.navigate(["login"], {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 350,
                curve: "ease"
            }
        });
    }

    gomap() {
        this._routerExtensions.navigate(["viewmap"], {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 350,
                curve: "ease"
            }
        });
    }    

    onMenuButtonTap(args: EventData) {
        // Navigate to corresponding page
        const menuButtonParent = (<StackLayout>args.object).parent;
        alert("Navigate to " + menuButtonParent.get("data-name"));
    }

    async onProfileButtonTap() {
        // Navigate to profile page here
        // alert(this.userApiService);
        try {
            const user = await this.userApiService.getUser("5c33e84dfbf87045d3aeae91");
            alert(user);
        } catch(err) {
            console.log(err);
        }
        // this.userApiService.getUser("5c33e84dfbf87045d3aeae91").then((data) => {
        //     alert(data);    
        // }).catch((error) => alert(error));
    }
}
