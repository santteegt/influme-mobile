import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
// import { NgZone } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
// import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { NavigationExtras } from "@angular/router";
import * as localstorage from "nativescript-localstorage";

import { UserapiService } from "../shared/api/user/userapi.service";

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";

import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

const localize = require("nativescript-localize");
// import * as request from "request-promise-native"



@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  moduleId: module.id,
})
export class UserComponent implements OnInit {

  private lnname: string;
  private lname: string;
  private imageurl: string; 
  private UserLogData: any;
  private lcity: string;
  private label_button: string;
  private showDetails: string;
  private menuOption: any;
  
  locations = [];


  constructor(private route: ActivatedRoute, private _routerExt: RouterExtensions, private page: Page,
                private userApiService: UserapiService) { 

      this.page.actionBarHidden = true;

      this.enableLocationTap();
      this.buttonGetLocationTap();

      this.menuOption = -1;

      this.route.queryParams.subscribe(params => {
          this.menuOption = params["menuOption"];
      });

      if(this.menuOption == 1){
        this.label_button = localize("edit");
        this.showDetails = "collapsed";

      }else if(this.menuOption == 0){
        this.label_button = localize("button.continue");
        this.showDetails = "visible";

      }

      //  this.page.backgroundSpanUnderStatusBar = true;    
      // this._routerExtensions.params.forEach((params) => { this.token = params["info"]; });
      // this.route.queryParams.subscribe(params => { this.token = params["info"]; });

      let infoUser = localstorage.getItem('ResultLogin');

      // if(infoUser == null){
      //     infoUser = localStorage.getItem('ResultLogin');         
      // }

      this.UserLogData = JSON.parse(infoUser);
       
      const vm = new Observable();
      //this.lnname = UserLogData["nickname"];
      //console.log('entry');
      //console.log(jwt);
    	// const usuario: string = jwt(this.token['idToken']);
      //  console.log("luego del decode");
    	// console.log (JSON.stringify(usuario));
    	//vm.set("imageurl", usuario['picture']);
	    vm.set("lnname", this.UserLogData["nickname"]);
    	//vm.set("lname", usuario['name']);
    	
      //this.page.bindingContext = vm;   
      //console.log(vm);
      
      //const view = <Page>args.object;
      //view.bindingContext = vm;

      //StackLayout.bindingContext = vm;

    	this.lnname = this.UserLogData["nickname"];
    	this.lname = this.UserLogData["name"];
    	this.imageurl = this.UserLogData["pictureURL"];

      // this.jsonDataUser = {
      //   "nameU": this.lname,
      //   "cityU": "Cuenca, Ecuador",
      //   "imageU": this.imageurl
      // }

      this.UserLogData["name"] = this.lname;
      this.UserLogData["pictureURL"] = this.imageurl;
      this.UserLogData["city"] = this.lcity;

      // this.UserLogData = {
      //   "name": result.name,
      //   "nickname": result.nickname,
      //   "pictureURL": result.pictureURL,
      //   "city": "",
      //   "accessToken": res['accessToken'],
      //   "idToken": res['idToken']

      //   "nameU": this.lname,
      //   "cityU": "Cuenca, Ecuador",
      //   "imageU": this.imageurl
      // }

  }

  ngOnInit() {
  }

  continue() {
      this.navigateInterest();
  }

  goback(){
    this._routerExt.back();    
  }

	private navigateInterest() {

    localStorage.removeItem('ResultLogin');
    localstorage.setItem('ResultLogin', JSON.stringify(this.UserLogData));                        

      // let navigationExtras: NavigationExtras = {
      //     queryParams: {
      //         "info": JSON.stringify(this.jsonDataUser)
      //   }
      // };      
      // this._routerExt.navigate(["interest"], navigationExtras);
      if(this.menuOption == 0){
        let editOption = 0;
        let navigationExtras: NavigationExtras = {
        queryParams: {
              "menuOption": editOption
        }};
        
        this._routerExt.navigate(["interest"], navigationExtras);
      }else if(this.menuOption == 1){
        this._routerExt.navigate(["profile"]);
      }
    }

  public enableLocationTap() {
      geolocation.isEnabled().then(function (isEnabled) {
          if (!isEnabled) {
              geolocation.enableLocationRequest().then(function () {
              }, function (e) {
                  console.log("Error: " + (e.message || e));
              });
          }
      }, function (e) {
          console.log("Error: " + (e.message || e));
      });
  }

  public buttonGetLocationTap() {
      // let that = this;
      geolocation.getCurrentLocation({
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 10000
      }).then(function (loc) {
          if (loc) {

            getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&key=AIzaSyBD71DgYMShdu8PD0x7waGLBPBgZjAZKes").then((r: any) => {
              console.log(JSON.stringify(r));
            }, (e) => {
              console.log("Error" + e);
            })
              // let options = {
              //     uri: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&sensor=true",
              // };
              // const result = await request.get(options);
              // request.get(options).then((result: string) => console.log(result));
              // console.log("{****} ADDRESS: " + result);
            // let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&sensor=true";
            // this.http.get(url)
            //     .map(results => results.json())
            //     .subscribe(results => {
            //             console.log("address " + results.results[0].formatted_address);
            //     }, error => {
            //         console.log("ERROR: ", error);
            //     });  

            console.log("Location: "+ JSON.stringify(loc));
            // that.locations.push(loc);
          }
      }, function (e) {
          console.log("Error: " + (e.message || e));
      });
  }

}
