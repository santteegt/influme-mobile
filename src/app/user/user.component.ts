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
  // private jsonDataUser: any;


  constructor(private route: ActivatedRoute, private _routerExt: RouterExtensions, private page: Page,
                private userApiService: UserapiService) { 

	this.page.actionBarHidden = true;
 //  this.page.backgroundSpanUnderStatusBar = true;
        
  // this._routerExtensions.params.forEach((params) => { this.token = params["info"]; });
  // this.route.queryParams.subscribe(params => { this.token = params["info"]; });

  let infoUser = localStorage.getItem('ResultLogin');

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
      console.log("aqui continue");
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
      this._routerExt.navigate(["interest"]);
    }
}
