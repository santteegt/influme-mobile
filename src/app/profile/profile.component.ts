import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
// import { NgZone } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
// import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { NavigationExtras } from "@angular/router";

import { UserapiService } from "../shared/api/user/userapi.service";
import * as localstorage from "nativescript-localstorage";

// import { registerElement } from 'nativescript-angular/element-registry';

// registerElement('Carousel', () => Carousel);
// registerElement('CarouselItem', () => CarouselItem);

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
})
export class ProfileComponent implements OnInit {

  private urlImage: string;
  private nameUser: string;
  private cityUser: string;
  private confImage: string;
  private UserLogData: any;
  private lintereses: any;
  private linteresesDown: any;
  private linteresesUp: any;

constructor(private route: ActivatedRoute, private page: Page,
                private userApiService: UserapiService, private _routExt: RouterExtensions) { 

    let token="";
    this.linteresesDown = [];
    this.linteresesUp = [];
		this.page.actionBarHidden = true;
  //   this.page.backgroundSpanUnderStatusBar = true;
        
    // this._routerExtensions.params.forEach((params) => { this.urlImage = params["info"]; });
    // this._routerExtensions.params.forEach((params) => { token = params["info"]; });
  
    // this.route.queryParams.subscribe(params => { token = params["info"]; });

    // let UserLogData = JSON.parse(token);
    // this.urlImage = UserLogData["imageU"];
    // this.nameUser = UserLogData["nameU"];
    // this.cityUser = UserLogData["cityU"];

    //this.page.getViewById("stackLayoutId").backgroundImage = this.urlImage;
    // this.confImage = "conf.png";

    let infoUser = localStorage.getItem('ResultLogin');

    this.UserLogData = JSON.parse(infoUser);

    console.log("[**] LOG INTERESES "+ JSON.stringify(this.UserLogData["intereses"]));

    this.urlImage = this.UserLogData["pictureURL"];
    this.nameUser = this.UserLogData["name"];
    this.cityUser = this.UserLogData["city"];
    this.lintereses = this.UserLogData["intereses"];

    for(var i=0; i<this.lintereses.length; i++){
      if(i > 8 ){
        this.linteresesUp.push(this.lintereses[i])  
      } else{
        this.linteresesDown.push(this.lintereses[i])
      }
    }

  }

  ngOnInit() {
  }

  goviewmap() {

    this.routeMap();

  }

  private routeMap() {
    // ****** NEW *******
    // let empty_value = [];
    // let navigationExtras: NavigationExtras = {
    //     queryParams: {
    //         "DataList": JSON.stringify(empty_value)
    //   }
    // };
    
    // this._routExt.navigate(["viewmap"], navigationExtras );
    this._routExt.navigate(["viewmap"]);
    // *****
  }

  logoutUser() {
 
    localStorage.removeItem('ResultLogin');
    this.routeMap();

  }

  goUser() {
  	// this.NavigateUser();

  }

 //  private NavigateUser() {

 //  	this.zone.run(() => {
 //        this._routerExtensions.back({
 //            animated: true,
 //            transition: {
 //                name: "slideTop",
 //                duration: 350,
 //                curve: "ease"
 //            }
 //        });
 //    });
 // }
}