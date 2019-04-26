import { AfterViewInit, Component, OnInit, ElementRef, ChangeDetectionStrategy, ViewChild, NgZone } from '@angular/core';
// import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { isAndroid } from 'tns-core-modules/platform';
import { alert } from 'tns-core-modules/ui/dialogs';
// import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { Page } from "tns-core-modules/ui/page";
import * as localstorage from "nativescript-localstorage";
import * as utils from "tns-core-modules/utils/utils";
import { localize } from "nativescript-localize";

import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { UsersmarkerService } from "../shared/api/usersmarker/usersmarker.service";

import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { Usersmarker } from "../shared/models/usersmarker.model";
import { Data } from "../providers/data/data";

import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { Usersdeals } from "../shared/models/usersdeals.model";

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";

import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

//********

// export function onTap(args: GestureEventData){
//     console.log(args.object.id);
//   };

// registerElement('Carousel', () => Carousel);
// registerElement('CarouselItem', () => CarouselItem);

@Component({
  selector: 'markerprofile',
  templateUrl: './markerprofile.component.html',
  styleUrls: ['./markerprofile.component.css'],
  moduleId: module.id,
})
export class MarkerprofileComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carouselRef: ElementRef;

    // Para coger un StackLayout y agregar elementos
  @ViewChild("myNgStack") stackRef: ElementRef;
  myNativeStack: StackLayout;

  public newImage: Image;
  
  // marker_profile: any;
  // userIdentification: string = "5c96f09a6d69fdd962e49c19";
  userIdentification: string;
  public isBusy = false;

  showDetails = "collapsed";

  imagedescription_a: string;
  imagedescription_b: string;
  imagedescription_c: string;
  labelfollowbutton: string;

  profile_id_selected: Markerprofile;
  images_descuentos: Dealsprofile[];

  responseUsersMarker: Usersmarker[];

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page,
    private dealsprofileService: DealsprofileService, private ngZone: NgZone, 
    private markerprofileService: MarkerprofileService, private usersmarkerService: UsersmarkerService, private usersinterestsService: UsersinterestsService,
    private data: Data, private usersdealsService: UsersdealsService) {

    // this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;  

    let profileMarkerString = ""; 

    // this.marker_profile = [
    //   { 
    //     "title" : "Mido",
    //     "descripcion": "Sushi Restaurant",
    //     "web": "www.mido.berlin",
    //     "seguidores": "120",
    //     "dir": "Wilmersdorfer Str. 94",
    //     "img1": "res://mido/1",
    //     "img2": "res://mido/6",
    //     "img3": "res://mido/3",        
    //     "promos": [
    //       {
    //         "img": "res://mido/CouponMido", "function": "onClickImga()"
    //       }
    //       // ,
    //       // {
    //       //   "img": "res://mercado/descuentoa", "function": "onClickImgb()"
    //       // }
    //     ]
    //   },
    //   { 
    //     "title" : "808 Club Berlin",
    //     "descripcion": "Night Club",
    //     "web": "www.808.berlin",
    //     "seguidores": "200",
    //     "dir": "Budapester Str. 38-50",
    //     "img1": "res://clubberlin/1",
    //     "img2": "res://clubberlin/2",
    //     "img3": "res://clubberlin/3",
    //     "promos": [
    //       {
    //         "img": "res://clubberlin/Coupon808", "function": "onClickImga()"
    //       }
    //     ]
    //   },
    //   { 
    //     "title" : "Zola",
    //     "descripcion": "Pizza Restaurant",
    //     "web": "www.zola.com",
    //     "seguidores": "240",
    //     "dir": "Paul-Lincke-Ufer 39-40",
    //     "img1": "res://zola/1",
    //     "img2": "res://zola/2",
    //     "img3": "res://zola/3",        
    //     "promos": [
    //       {
    //         "img": "res://zola/CouponZola", "function": "onClickImga()"
    //       }
    //     ]
    //   },
    //   { 
    //     "title" : "Sons of Mana",
    //     "descripcion": "Hawaiian Cuisine",
    //     "web": "www.sonsofmana.de",
    //     "seguidores": "540",
    //     "dir": "Alte Schönhauser Str. 7-8",
    //     "img1": "res://sonsofmana/1",
    //     "img2": "res://sonsofmana/2",
    //     "img3": "res://sonsofmana/3",        
    //     "promos": [
    //       {
    //         "img": "res://sonsofmana/CouponSOM", "function": "onClickImga()"
    //       }
    //     ]
    //   },
    //   { 
    //     "title" : "Bar Tausend",
    //     "descripcion": "Cocktails - Music - Dining",
    //     "web": "www.tausendberlin.com",
    //     "seguidores": "290",
    //     "dir": "G9CM+8W Berlín, Alemania",
    //     "img1": "res://tausend/1",
    //     "img2": "res://tausend/2",
    //     "img3": "res://tausend/3",                
    //     "promos": [
    //       {
    //         "img": "res://tausend/CouponTausend", "function": "onClickImga()"
    //       }
    //     ]
    //   },
    //   { 
    //     "title" : "Aquadom & Sealife Berlin",
    //     "descripcion": "Aquarium",
    //     "web": "www.visitsealife.com",
    //     "seguidores": "390",
    //     "dir": "Spandauer Str. 3",
    //     "img1": "res://asb/1",
    //     "img2": "res://asb/2",
    //     "img3": "res://asb/3",                        
    //     "promos": [
    //       {
    //         "img": "res://asb/CouponSealife", "function": "onClickImga()"
    //       }
    //     ]
    //   },
    //   { 
    //     "title" : "Berliner Fernsehturm",
    //     "descripcion": "Television Tower",
    //     "web": "www.tv-turm.de",
    //     "seguidores": "790",
    //     "dir": "GCC5+8Q Berlín, Alemania",
    //     "img1": "res://berliner/1",
    //     "img2": "res://berliner/2",
    //     "img3": "res://berliner/3",
    //     "promos": [
    //       {
    //         "img": "res://berliner/CouponBerliner", "function": "onClickImga()"
    //       }
    //     ]
    //   }      
    // ];

    // this.route.queryParams.subscribe(params => {
    //     profileMarkerString = params["MarkerProfile"];
    // });
    // profileMarkerString = this.data.storage_vara;

    // this.profile_id_selected = JSON.parse(profileMarkerString); 
    this.profile_id_selected = this.data.storage_vara;     

    this.imagedescription_a = "res://" + this.profile_id_selected.images[0];
    this.imagedescription_b = "res://" + this.profile_id_selected.images[1];
    this.imagedescription_c = "res://" + this.profile_id_selected.images[2];


    // this.profile_id_selected = this.marker_profile.filter(d => d.title === titleSearch);

    // this.availableMarkers().then(dataM => {

    //   // console.log("[*] Marker final " + this.dealsprofilecontent.);        
    //   this.marker_profile = dataM;

    //   
    // }
  }

  ngOnInit() {
        
        if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userIdentification = userLoginRecord.info._id;
        }

        if(this.userIdentification!=null){ 
          this.showDetails="visible";
          this.isFollower(this.userIdentification, this.profile_id_selected._id).then(dataResponse => {

            console.log("Revisa si esta siguiendo: " + dataResponse.length);

            this.responseUsersMarker = dataResponse;

            if(this.responseUsersMarker.length == 0){
              this.labelfollowbutton = localize("follow");

            }else if(this.responseUsersMarker.length > 0){
              this.labelfollowbutton = localize("unfollow");
            }

          });
        }else{
          this.showDetails="collapsed";
        }        

  }

  ngAfterViewInit() {
       // const carousel = this.carouselRef.nativeElement as Carousel;
        // // if (isAndroid) {
        // //   setTimeout(() => {
        // //     carousel.indicatorAnimation = IndicatorAnimation.WORM;
        // //     alert({
        // //       message: 'The indicator animation has changed from SWAP to WORM. View the items.component.ts to see how.',
        // //       okButtonText: 'Okay'
        // //     });
        // //   }, 5000);
        // }

    // if(this.userIdentification!=null){ 
    //   this.showDetails="visible";
    //   this.isFollower(this.userIdentification, this.profile_id_selected._id).then(dataResponse => {

    //     console.log("Revisa si esta siguiendo: " + dataResponse.length);

    //     this.responseUsersMarker = dataResponse;

    //     if(this.responseUsersMarker.length == 0){
    //       this.labelfollowbutton = localize("follow");

    //     }else if(this.responseUsersMarker.length > 0){
    //       this.labelfollowbutton = localize("unfollow");
    //     }

    //   });
    // }else{
    //   this.showDetails="collapsed";
    // }


    this.getDealsMarkerProfile(this.profile_id_selected._id).then(dataResponse => {


        this.images_descuentos = dataResponse;
            // .profile_id_selected[0]["promos"];
        this.myNativeStack = this.stackRef.nativeElement;

        for (var i=0; i<this.images_descuentos.length; i++){

          let valueimage = "res://" + this.images_descuentos[i].img;
          this.newImage = new Image();          
          this.newImage.src = valueimage
          this.newImage.id = this.images_descuentos[i]._id;
          this.newImage.style.margin = "5 0";
          this.newImage.stretch = "fill";
          this.newImage.on(GestureTypes.tap, function (args: GestureEventData ) { 
            if(this.userIdentification!=null){        
              let widgetImage = <Image>args.object;
              let json_deal_selected: Dealsprofile[] = this.images_descuentos.filter(d => d._id === widgetImage.id);
              let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "DealMarker": JSON.stringify(json_deal_selected),
                      "MarkerProfile": JSON.stringify(this.profile_id_selected)
                    }
              };
              // this._routerExtensions.navigate(["dealprofile"], navigationExtras);
              this.ngZone.run(() => this._routerExtensions.navigate(['dealprofile'], navigationExtras)).then();
            }else{
              this.ngZone.run(() => this._routerExtensions.navigate(["login"], {animated: false})).then();
            }  
          }, this);
          
          this.myNativeStack.addChild(this.newImage);
        }

    });

    // this.myNativeStack = this.stackRef.nativeElement;

    // for (var i=0; i<this.images_descuentos.length; i++){
    //   let valueimage = this.images_descuentos[i]["img"];
    //   this.newImage = new Image();
    //   this.newImage.src = valueimage
    //   this.newImage.stretch = "fill";
    //   this.newImage.on(GestureTypes.tap, function (args: GestureEventData) {
    
    //       console.log(args.ios)          
    //   });
    //   this.myNativeStack.addChild(this.newImage);
    //   }
  }

  

  // onClickImga(navigationExtras){
  //   // QUITAR COMENTARIOS
  //   // let jsonNextPage = {};

  //   // console.log("[*] Image Deal "+ this.profile_id_selected[0]["promos"][0]["img"])

  //   // jsonNextPage = {
  //   //   "titulo": this.profile_id_selected[0]["title"], 
  //   //   "dealId": this.profile_id_selected[0]["promos"][0]["img"]
  //   // }    



  //   // let navigationExtras: NavigationExtras = {
  //   //     queryParams: {
  //   //         "infoDealMarker": JSON.stringify(jsonNextPage)
  //   //       }
  //   // };

  //   this._routerExtensions.navigate(["dealprofile"], navigationExtras) 
  // }

//   onClickImgb(){
//     alert("Press1")
// }

  onClickFollow(){

    let objectUpdateMarker = {} as Markerprofile;
    let objectUpdateFollowers = {} as Usersmarker;

    console.log("[*] Debug tamano " + this.responseUsersMarker.length);

    if(this.responseUsersMarker.length == 0){
      this.labelfollowbutton = localize("unfollow");
      objectUpdateMarker.followers = this.profile_id_selected.followers + 1;
      //save table users_markers
      objectUpdateFollowers.userid = this.userIdentification;
      objectUpdateFollowers.markerid = this.profile_id_selected._id;
      objectUpdateFollowers.status = true;
      this.postUserMarkerFollower(objectUpdateFollowers).then(dataResponse => {
        console.log("Save User_MArker " + JSON.stringify(dataResponse));
        this.responseUsersMarker = [];
        this.responseUsersMarker.push(dataResponse);
      });
    }else if(this.responseUsersMarker[0].status == false){
      this.labelfollowbutton = localize("unfollow");
      objectUpdateMarker.followers = this.profile_id_selected.followers + 1;
      //update table users_markers
      objectUpdateFollowers.status = true;
      this.putUserMarkerFollower(this.userIdentification, this.profile_id_selected._id, objectUpdateFollowers).then(dataResponse => {
        console.log("Update User_Marker " + JSON.stringify(dataResponse));
        this.responseUsersMarker[0].status = dataResponse.status;
      });      
    }else if(this.responseUsersMarker[0].status == true){
      this.labelfollowbutton = localize("follow");
      objectUpdateMarker.followers = this.profile_id_selected.followers - 1;
      //update table users_markers
      objectUpdateFollowers.status = false;
      this.putUserMarkerFollower(this.userIdentification, this.profile_id_selected._id, objectUpdateFollowers).then(dataResponse => {
        console.log("Update User_Marker " + JSON.stringify(dataResponse));
        this.responseUsersMarker[0].status = dataResponse.status;
      });
    }

    this.putMarkerFollower(this.profile_id_selected._id, objectUpdateMarker).then(dataResponse => {
      this.profile_id_selected.followers = dataResponse.followers;

    });
    
}

  goviewmap() {
      this._routerExtensions.navigate(["viewmap"], {animated: false});
  }

  gologinview() {

        let jsonuseraux = "";
        let jsonDataUser: any;
        jsonuseraux = localstorage.getItem('ResultLogin');

        console.log("[*] Storage Perfil " + jsonuseraux);

        if( jsonuseraux == null)
            this._routerExtensions.navigate(["login"], {animated: false});
        else{
            this.getDealsSubscribe(this.userIdentification).then(dealsResponse => {
                this.data.storage_vara = dealsResponse;
                this._routerExtensions.navigate(["profile"], {animated: false});                            
            });

        }
    }

    openURLMarker(){

        utils.openUrl("http://" + this.profile_id_selected.web);
    }

    async getDealsMarkerProfile(markerid) {

        try {
            const deals_profile: Dealsprofile[] = await this.dealsprofileService.getDealsprofile(markerid);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return deals_profile;
        } catch(err) {
            console.log(err);
        }
        
    }

    async putMarkerFollower(markerid, objectUpdate: Markerprofile) {

        try {
            const deals_profile: Markerprofile = await this.markerprofileService.updateFollowersMarker(markerid, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return deals_profile;
        } catch(err) {
            console.log(err);
        }
        
    }

    async isFollower(userid, markerid) {

        try {
            const countRecords: Usersmarker[] = await this.usersmarkerService.getRecordFollow(userid, markerid);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return countRecords;
        } catch(err) {
            console.log(err);
        }
        
    }        

    async putUserMarkerFollower(userid, markerid, objectUpdate: Usersmarker) {

        try {
            const user_marker_profile: Usersmarker = await this.usersmarkerService.updateFollowersMarker(userid, markerid, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_marker_profile;
        } catch(err) {
            console.log(err);
        }
        
    }

    async postUserMarkerFollower(objectUpdate: Usersmarker) {

        try {
            const user_marker_profile: Usersmarker = await this.usersmarkerService.saveFollowersMarker(objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_marker_profile;
        } catch(err) {
            console.log(err);
        }
        
    }    

    gosearch() {

        this._routerExtensions.navigate(["search"], {animated: false});
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

        if(this.userIdentification!=null){

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

                            // let navigationExtras: NavigationExtras = {
                            //     queryParams: {
                            //         "InterestsDeals": JSON.stringify(arrayGroupBy),
                            //         "HotDeals": JSON.stringify(myDataArray)
                            //     }

                            // };

                            this.data.storage_vara = arrayGroupBy;
                            this.data.storage_varb = myDataArray;

                            this.isBusy = false;

                            this._routerExtensions.navigate(["hotdeals"], {animated: false});                        

                        });
                        
                    });

                });

            });    
        }else{
          this._routerExtensions.navigate(["login"], {animated: false});
        }


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

  async getDealsSubscribe(userId: string) {

      try {
          const users_deals: any = await this.usersdealsService.getAllDealsSubscribe(userId);
          return users_deals;
      } catch(err) {
          console.log(err);
      }
      
  }
  
  onBusyChanged(args) {
        let indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
  }
}
