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
import { Carousel, CarouselItem } from 'nativescript-carousel';

import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { UsersmarkerService } from "../shared/api/usersmarker/usersmarker.service";
import { ImagesService } from "../shared/api/images/images.service";

import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { Usersmarker } from "../shared/models/usersmarker.model";
import { Data } from "../providers/data/data";

// import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
// import { Usersdeals } from "../shared/models/usersdeals.model";

import { DealsqrcodeService } from "../shared/api/dealsqrcode/dealsqrcode.service";
import { Dealsqrcode } from "../shared/models/dealsqrcode.model";

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";

import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color";

import { openApp } from "nativescript-open-app";

// var utils = require("utils/utils");

@Component({
  selector: 'markerprofile',
  templateUrl: './markerprofile.component.html',
  styleUrls: ['./markerprofile.component.css'],
  moduleId: module.id,
})
export class MarkerprofileComponent implements OnInit {
  // //Para carrusel
  @ViewChild('mycarite') carRef: ElementRef;
  public carouselG: Carousel;

  // Para coger un StackLayout y agregar elementos
  @ViewChild("myNgStack") stackRef: ElementRef;
  myNativeStack: StackLayout;

  // public newImage: Image;
  // //Para carrusel
  // public carouselItem: CarouselItem;


  userIdentification: string;
  public isBusy = false;

  showDetails = "collapsed";

  imagedescription_a: string;
  imagedescription_b: string;
  imagedescription_c: string;
  labelfollowbutton: string;
  tesarray:any = [];

  profile_id_selected: Markerprofile;
  images_descuentos: Dealsprofile[];

  responseUsersMarker: Usersmarker[];


  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page,
    private dealsprofileService: DealsprofileService, private ngZone: NgZone, 
    private markerprofileService: MarkerprofileService, private imagesService: ImagesService,
    private usersmarkerService: UsersmarkerService, private usersinterestsService: UsersinterestsService,
    private data: Data, private dealsqrcodeService: DealsqrcodeService) {

    let profileMarkerString = ""; 

    this.profile_id_selected = this.data.storage_vara;      

    this.tesarray.push("res://zola/zola1");
    this.tesarray.push("res://zola/zola2");

    // this.imagedescription_a = this.profile_id_selected.images[0];    

    // this.profile_id_selected.images.forEach(async (itemvalue) => {


    // });

         //    console.log(">>>> " + itemvalue);

         //    this.getImageFilter(itemvalue).then(dataImage=> { 
         //      console.log("Entro");     
         //      this.base64ImageSource.push(dataImage);              
         //    });

         // });



        // //Recuperando images para carousel de fotos de perfil 
        // const populateImages = async () => {
        //   for (const itemvalue of this.profile_id_selected.images) {
        //       await this.getImageFilter(itemvalue).then(dataImage => {
        //           const carousel = this.carouselRef.nativeElement as Carousel; 
        //           // this.imagesbase64encode.push(fromBase64(dataImage.imagesource));
        //           this.newImage = new Image();          
        //           this.newImage.src = fromBase64(dataImage.imagesource);
        //           this.newImage.stretch = "fill";
        //           this.carouselItem = new CarouselItem(); 
        //           this.carouselItem.addChild(this.newImage);               
        //           carousel.addChild(this.carouselItem);
        //       });
        //   }
        // }

        // populateImages().then(() => {
        //     console.log('done');             
        //     // const carousel = this.carouselRef.nativeElement as Carousel;  

        //     // console.log("SIZE IMAGENES " + this.imagesbase64encode.length);

        //     // for(var x=0; x<this.imagesbase64encode.length;x++){

        //     //   this.newImage = new Image();          
        //     //   this.newImage.src = this.imagesbase64encode[x];
        //     //   this.newImage.stretch = "fill";
        //     //   this.carouselItem = new CarouselItem(); 
        //     //   this.carouselItem.addChild(this.newImage);               
        //     //   carousel.addChild(this.carouselItem);

        //     // }             
            
        // });


}



  ngOnInit() { 

        this.carouselG = this.carRef.nativeElement;            

        if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userIdentification = userLoginRecord.info._id;
        }

        if(this.userIdentification!=null){ 
          this.showDetails="visible";
          this.isFollower(this.userIdentification, this.profile_id_selected._id).then(dataResponse => {

            console.log("Revisa si esta siguiendo: " + dataResponse.length);

            this.responseUsersMarker = dataResponse;

            // if(this.responseUsersMarker.length == 0){
            //   this.labelfollowbutton = localize("follow");

            // }else if(this.responseUsersMarker.length > 0){
            //   this.labelfollowbutton = localize("unfollow");
            // }
            if(this.responseUsersMarker.length>0){
              if(this.responseUsersMarker[0].status == false){
                this.labelfollowbutton = localize("follow");

              }else if(this.responseUsersMarker[0].status == true){
                this.labelfollowbutton = localize("unfollow");
              }             
            }else{
              this.labelfollowbutton = localize("follow");
            }            

          });
        }else{
          this.showDetails="collapsed";
        }        

  }


  loadImagesMarker(){

    this.profile_id_selected.images.forEach(async (itemvalue) => {
      // for (var itemvalue of this.profile_id_selected.images) {                
        const carouselItem = new CarouselItem();
        
        this.getImageFilter(itemvalue).then(dataImage=> {

              const newImage = new Image();          
              newImage.src = fromBase64(dataImage.imagesource);            
              newImage.stretch = "aspectFill";
              carouselItem.width = 350;                  
              carouselItem.addChild(newImage);                                                             
        }); 
        this.carouselG.addChild(carouselItem);
    });  

  }

  ngAfterViewInit() { 



    this.loadImagesMarker();

    // Para cargar deals
    this.getDealsMarkerProfile(this.profile_id_selected._id).then(dataResponse => {

        let contIndex = 0;

        this.myNativeStack = this.stackRef.nativeElement;

        this.images_descuentos = dataResponse;

        if(this.userIdentification!=null){

          if(this.images_descuentos.length>0){

              console.log("{*} HAY deals");

              this.images_descuentos.forEach(async (element) => {

                console.log("{*} Iterando Deals "+ JSON.stringify(element));

                this.setDealsHtml(element);

                /*               
                * Documentado por cambios frontend
                */

                // this.getDealsByUserUsed(this.userIdentification, element._id).then(dataResponseVerify => {

                //   console.log("{*} Usuario registro? "+ dataResponseVerify.length);

                //   if(dataResponseVerify.length==0){
                //     this.setDealsHtml(element);
                //   }else{
                //     contIndex = contIndex + 1;
                //   }              
                //   if(contIndex == this.images_descuentos.length){
                //     this.setDealsHtmlEmpty();                    
                //   }

                // });

              });

          }else{
              this.setDealsHtmlEmpty();
          }
        }else{
          if(this.images_descuentos.length>0){

              this.images_descuentos.forEach(async (element) => {
                    this.setDealsHtml(element);
              });
          }else{
              this.setDealsHtmlEmpty(); 
          }
        }

        // Fill imagenes de local slide
        // this.profile_id_selected.images.forEach(async (itemvalue) => {
        // this.tesarray.forEach( (itemvalue) => {

        //     this.carouselItem = new CarouselItem();

        //   // console.log("Name Image " + itemvalue);

        //   // this.getImageFilter(itemvalue).then(dataImage=> {              
              
        //       this.newImage = new Image();          
        //       // this.newImage.src = fromBase64(dataImage.imagesource);
        //       this.newImage.src = itemvalue;

        //       this.newImage.stretch = "fill";
              

        //       this.carouselItem.addChild(this.newImage);                            
        //       carouselG.addChild(this.carouselItem);
        //       // this.stacklItem.addChild(this.carouselItem);

        //   // });

        // });

    });

  }

  public setDealsHtmlEmpty(){
      var newImage = new Image();          
      newImage.src = "res://empty";
      newImage.style.margin = "5 0";
      newImage.stretch = "fill";  
      this.myNativeStack.addChild(newImage);    
  }

  public setDealsHtml(elementDeals){

    var element = elementDeals;

    this.getImageFilter(element.img).then(dataImage=> {    

          // let valueimage = "res://" + element.img;
          const newImage = new Image();          
          // this.newImage.src = valueimage
          newImage.src = fromBase64(dataImage.imagesource);
          newImage.id = element._id;
          newImage.style.margin = "5 0";
          newImage.stretch = "fill";
          newImage.on(GestureTypes.tap, function (args: GestureEventData ) { 
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
          
          this.myNativeStack.addChild(newImage); 
    });
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
                        }else{
                            this.isBusy = false;
                            
                            this.data.storage_vara = [];
                            this.data.storage_varb = myDataArray;

                            this._routerExtensions.navigate(["hotdeals"], {animated: false});                                                    
                        }                        
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
          const users_deals: any = await this.dealsqrcodeService.getAllDealsSubscribe(userId);
          return users_deals;
      } catch(err) {
          console.log(err);
      }
      
  }

  // async getDealsByUserUsed(userid, dealid) {

  //       try {
  //     const dealsRaw: Usersdeals[] = await this.usersdealsService.getDealsByUser(userid, dealid);
  //     return dealsRaw;
  //       } catch(err) {
  //     console.log(err);
  //       }
        
  //   }  
  
  onBusyChanged(args) {
        let indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
  }

  async getImageFilter(idImage) {
    try {
      // console.log("Name Img " + idImage);
      const dealsRaw: any = await this.imagesService.getImagesFiles(idImage);
      // console.log("IMG "+JSON.stringify(dealsRaw));
      return dealsRaw;
        } catch(err) {
      console.log(err);
        }
        
  }  

    goInstApp(){
      console.log("nickUser " + this.profile_id_selected.instagramid);
      var installed = openApp("instagram://user?username="+this.profile_id_selected.instagramid, false);
      if (!installed) {
          utils.openUrl("https://instagram.com");
      }      
    }  

    goFaceApp(){
      console.log("nickUser " + this.profile_id_selected.instagramid);
      // var installed = openApp("fb://profile/"+this.profile_id_selected.facebookid, false);
      // if (!installed) {
          utils.openUrl("https://facebook.com/"+this.profile_id_selected.facebookid);
      // }      
    }      


}
