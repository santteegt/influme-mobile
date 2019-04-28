import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Carousel, CarouselItem } from 'nativescript-carousel';
import {ActivatedRoute} from "@angular/router";
// import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { NavigationExtras } from "@angular/router";

import { UserapiService } from "../shared/api/user/userapi.service";
import * as localstorage from "nativescript-localstorage";
import { Image } from "tns-core-modules/ui/image";

import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import * as nsPlatform from "nativescript-platform";

import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";

import { Data } from "../providers/data/data";


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

  userIdentification: string;
  private urlImage: string;
  private nameUser: string;
  private cityUser: string;
  private followers: string;
  private following: string;

  private confImage: string;
  private userLogData: any;
  private lintereses: any;
  private linteresesDown: any;
  private linteresesUp: any;
  private dealsSubscribe: any = [];
  public isBusy = false;

 @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;

  @ViewChild("carouselO") carouselRef: ElementRef;
  // private varCarousel: Carousel;

  @ViewChild("maintitlesettings") stackMainTitleSettings: ElementRef;
  titleSettingsNativeStack: StackLayout;

  @ViewChild("maintitle") stackMainTitle: ElementRef;
  titleNativeStack: GridLayout;      

  public newImage: Image;  
  public carouselItem: CarouselItem;


constructor(private route: ActivatedRoute, private page: Page,
                private userApiService: UserapiService, private _routExt: RouterExtensions, 
                private _changeDetectionRef: ChangeDetectorRef, private dealsprofileService: DealsprofileService,
                private markerprofileService: MarkerprofileService, 
                private usersinterestsService: UsersinterestsService, private data: Data) { 

    let token="";
    this.linteresesDown = [];
    this.linteresesUp = [];
    this.page.actionBarHidden = true;

  //   this.page.backgroundSpanUnderStatusBar = true;
        
    // this._routerExtensions.params.forEach((params) => { this.urlImage = params["info"]; });
    // this._routerExtensions.params.forEach((params) => { token = params["info"]; });
  
    // this.route.queryParams.subscribe(params => { token = params["info"]; });

    // let userLogData = JSON.parse(token);
    // this.urlImage = userLogData["imageU"];
    // this.nameUser = userLogData["nameU"];
    // this.cityUser = userLogData["cityU"];

    //this.page.getViewById("stackLayoutId").backgroundImage = this.urlImage;
    // this.confImage = "conf.png";

    // this.route.queryParams.subscribe(params => {
    //   if(params["DealsSubscribe"]!=null){
    //     this.dealsSubscribe = JSON.parse(params["DealsSubscribe"]);
    //   }else{
    //     this.dealsSubscribe = [];
    //   }
    // });

    if(this.data.storage_vara!=null){
      this.dealsSubscribe = this.data.storage_vara;
    }else{
      this.dealsSubscribe = [];
    }


    let infoUser = localStorage.getItem('ResultLogin');
    this.userLogData = JSON.parse(infoUser);

    this.userIdentification = this.userLogData.info._id;

    this.urlImage = this.userLogData.info.picturehome;
    this.nameUser = this.userLogData.info.name;
    this.cityUser = this.userLogData.info.city;
    this.followers = this.userLogData.info.followers;
    this.following = this.userLogData.info.following;

    this.lintereses = this.userLogData.intereses;

    for(var i=0; i<this.lintereses.length; i++){
      if(i > 8 ){
        this.linteresesUp.push(this.lintereses[i])  
      } else{
        this.linteresesDown.push(this.lintereses[i])
      }
    }


    // const carousel = this.carouselRef.nativeElement as Carousel;

    // this.getDealsSubscribe(this.userLogData.info._id).then(dealsResponse => {
    //   if(dealsResponse.length>0){
    //     dealsResponse.forEach(function(element) {
    //       this.newImage = new Image();          
    //       this.newImage.src = element.dealid.img;
    //       this.newImage.stretch = "fill";
    //       this.caruselItem = new CarouselItem(); 
    //       this.caruselItem.addChild(this.newImage); 
    //       carousel.addChild(this.caruselItem);
    //     });
    //   }else{
    //     this.newImage = new Image();          
    //     this.newImage.src = "res://empty";
    //     this.newImage.stretch = "fill";
    //     this.caruselItem = new CarouselItem(); 
    //     this.caruselItem.addChild(this.newImage); 
    //     carousel.addChild(this.caruselItem);        
    //   }

    //   this.isVisible = true;
    // });    

  }

  ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        
        this.fillCarousel();

        // this.getDealsSubscribe(this.userLogData.info._id).then(dealsResponse => {
        //   this.dealsSubscribe = dealsResponse;
        //   this.fillCarousell();
        // });

  }

  private fillCarousel(){
    const carousel = this.carouselRef.nativeElement as Carousel;

    if(this.dealsSubscribe.length>0){

      for(var j=0; j<this.dealsSubscribe.length; j++){

        this.newImage = new Image();          
        this.newImage.src = "res://"+this.dealsSubscribe[j].dealid.img;
        this.newImage.stretch = "fill";
        this.carouselItem = new CarouselItem(); 
        this.carouselItem.addChild(this.newImage);               
        carousel.addChild(this.carouselItem);

      }

    }else{
      this.newImage = new Image();          
      this.newImage.src = "res://empty";
      this.newImage.stretch = "fill";
      this.carouselItem = new CarouselItem(); 
      this.carouselItem.addChild(this.newImage); 
      carousel.addChild(this.carouselItem);        
    }

  }

  ngOnInit() {

    this.titleNativeStack = this.stackMainTitle.nativeElement;
    this.titleSettingsNativeStack = this.stackMainTitleSettings.nativeElement;


    if (nsPlatform.device.model.includes("11")){
        this.titleSettingsNativeStack.paddingTop = 93;
        this.titleNativeStack.paddingTop = 93;
    }else{
        this.titleSettingsNativeStack.paddingTop = 49;
        this.titleNativeStack.paddingTop = 49;
    }     

  }

  goviewmap() {

    this.routeMap();

  }

  private routeMap() {
    this._routExt.navigate(["viewmap"], {animated: false});
  }

  logoutUser() {
 
    localStorage.removeItem('ResultLogin');
    this.routeMap();

  }

  goUser() {
    // this.NavigateUser();

  }

 //  private NavigateUser() {

 //   this.zone.run(() => {
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

        this._routExt.navigate(["search"], {animated: false});
    }    

    goHotDeals() {

        this.isBusy = true;

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

                    if(strMarkersId!=""){                    

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

                          this.isBusy = false;
                          
                          this.data.storage_vara = arrayGroupBy;
                          this.data.storage_varb = myDataArray;

                          this._routExt.navigate(["hotdeals"], {animated: false});                        

                          // let navigationExtras: NavigationExtras = {
                          //     queryParams: {
                          //         "InterestsDeals": JSON.stringify(arrayGroupBy),
                          //         "HotDeals": JSON.stringify(myDataArray)
                          //     }
                          // };

                          // this._routExt.navigate(["hotdeals"], navigationExtras);                        

                      });
                    }else{
                        this.isBusy = false;
                        
                        this.data.storage_vara = [];
                        this.data.storage_varb = myDataArray;

                        this._routExt.navigate(["hotdeals"], {animated: false});                                                    
                    }                    
                    
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

    onBusyChanged(args) {
        let indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    }

}
