import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
// import { NgZone } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
// import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { NavigationExtras } from "@angular/router";

import { UserapiService } from "../shared/api/user/userapi.service";
import * as localstorage from "nativescript-localstorage";

// COMUN ***

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";

//********

// import { registerElement } from 'nativescript-angular/element-registry';

// registerElement('Carousel', () => Carousel);
// registerElement('CarouselItem', () => CarouselItem);

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  moduleId: module.id,
})
export class ProfileComponent implements AfterViewInit, OnInit {

  userIdentification: string = "5c96f09a6d69fdd962e49c19";
  private urlImage: string;
  private nameUser: string;
  private cityUser: string;
  private confImage: string;
  private UserLogData: any;
  private lintereses: any;
  private linteresesDown: any;
  private linteresesUp: any;

 @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;


constructor(private route: ActivatedRoute, private page: Page,
                private userApiService: UserapiService, private _routExt: RouterExtensions, 
                private _changeDetectionRef: ChangeDetectorRef, private dealsprofileService: DealsprofileService,
                private markerprofileService: MarkerprofileService, private usersinterestsService: UsersinterestsService) { 

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

  ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
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

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    public goEditProfile(){
      let editOption = 1;
      let navigationExtras: NavigationExtras = {
          queryParams: {
              "menuOption": editOption
        }
      };
      
      this._routExt.navigate(["user"], navigationExtras);
    }

    public goEditInterests(){
      let editOption = 1;
      let navigationExtras: NavigationExtras = {
          queryParams: {
              "menuOption": editOption
        }
      };
      
      this._routExt.navigate(["interest"], navigationExtras);
    }

// COMUN ****

    gosearch() {

        this._routExt.navigate(["search"]);
    }    

    goHotDeals() {

        let myDataArray: Dealsprofile[];
        let typesUserArray: any;
        let markerIdentificators = [];
        let myDeals: Dealsprofile[];
        var strTypesUserArray = "";
        var strMarkersId = "";
        let arrayGroupBy: any = [];


        this.getCurrentHotDeals().then(dataResponse => {

            myDataArray = dataResponse;

            this.getTypesMarkerByUsers(this.userIdentification).then(typeResponse => {      

                typesUserArray = typeResponse.map(function(typeRes) {
                  return typeRes.typeid;
                });                

                strTypesUserArray = typesUserArray.join(","); 

                this.getMarkerByType(strTypesUserArray).then(markersResponse => {      
                    markerIdentificators = markersResponse.map(function(markerRes) {
                      return markerRes._id;
                    });

                    strMarkersId = markerIdentificators.join(","); 

                    this.getUsersInterestsDeals(strMarkersId).then(dealsResponse => {      
                        myDeals = dealsResponse;
                        let alltypes = [];

                        alltypes = myDeals.map(function(typeList) {
                          return typeList.markerid.type.description;;
                        });     
                        alltypes = alltypes.filter(function(elem, index, self) {
                          return index === self.indexOf(elem);
                        })
                        
                        let myDealsAgroup: Dealsprofile[];
                        
                        
                        for(let i=0; i<alltypes.length; i++){
                            let elementArray = {};
                            myDealsAgroup = myDeals.filter(itmeType => itmeType.markerid.type.description === alltypes[i]);
                            elementArray[alltypes[i]] = myDealsAgroup;
                            arrayGroupBy.push(elementArray);
                                
                        }

                        let navigationExtras: NavigationExtras = {
                            queryParams: {
                                "InterestsDeals": JSON.stringify(arrayGroupBy),
                                "HotDeals": JSON.stringify(myDataArray)
                            }
                        };

                        this._routExt.navigate(["hotdeals"], navigationExtras);                        

                    });
                    
                });

            });

        });    



    }

  async getCurrentHotDeals() {

      try {
          const user_marker_profile: Dealsprofile[] = await this.dealsprofileService.getTrendingDeals();
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_marker_profile;
      } catch(err) {
          console.log(err);
      }
      
  }

  async getTypesMarkerByUsers(idUser: string) {

      try {
          const user_type: Usersinterests[] = await this.usersinterestsService.getTypesFromUsers(idUser);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_type;
      } catch(err) {
          console.log(err);
      }
      
  }

  async getMarkerByType(typeIds: string) {


      try {
          const marker_type: Markerprofile[] = await this.markerprofileService.getMarkerByType(typeIds);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return marker_type;
      } catch(err) {
          console.log(err);
      }
      
  }    

  async getUsersInterestsDeals(markersIds: string) {

      try {
          const user_marker_profile: Dealsprofile[] = await this.dealsprofileService.getDealsprofile(markersIds);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_marker_profile;
      } catch(err) {
          console.log(err);
      }
      
  }    

//******    

}