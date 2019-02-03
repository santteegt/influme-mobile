import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
// import { NgZone } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
// import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { NavigationExtras } from "@angular/router";

import { UserapiService } from "../shared/api/user/userapi.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  moduleId: module.id,
})
export class UserComponent implements OnInit {

  private token: string;
  private lnname: string;
  private lname: string;
  private imageurl: string; 
  private UserLogData: any;
  private jsonDataUser: any;


  constructor(private route: ActivatedRoute, private _routerExt: RouterExtensions, private page: Page,
                private userApiService: UserapiService) { 

	this.page.actionBarHidden = true;
 //  this.page.backgroundSpanUnderStatusBar = true;
        
  // this._routerExtensions.params.forEach((params) => { this.token = params["info"]; });
  this.route.queryParams.subscribe(params => { this.token = params["info"]; });

  console.log(this.token);
  this.UserLogData = JSON.parse(this.token);
       
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
  	this.imageurl = this.UserLogData["picture"];

    this.jsonDataUser = {
      "nameU": this.lname,
      "cityU": "Cuenca, Ecuador",
      "imageU": this.imageurl
    }

  }

  ngOnInit() {
  }

  continue() {
      this.navigateProfile();
      console.log("aqui continue");
  }

  goback(){
    this._routerExt.back();    
  }

	private navigateProfile() {
      // this.zone.run(() => {
      let navigationExtras: NavigationExtras = {
          queryParams: {
              // "info": JSON.stringify(this.UserLogData)
              "info": JSON.stringify(this.jsonDataUser)
        }
      };

      this._routerExt.navigate(["profile"], navigationExtras);
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
}
