import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { Image } from "tns-core-modules/ui/image";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import * as nsPlatform from "nativescript-platform";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { Data } from "../providers/data/data";
import { NavigationExtras } from "@angular/router";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";
// import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
// import { Usersdeals } from "../shared/models/usersdeals.model";
import { DealsqrcodeService } from "../shared/api/dealsqrcode/dealsqrcode.service";
import { Dealsqrcode } from "../shared/models/dealsqrcode.model";

import { UsersfollowService } from "../shared/api/usersfollow/usersfollow.service";
import { Usersfollow } from "../shared/models/usersfollow.model";
import { UserapiService } from "../shared/api/user/userapi.service";
import { User } from "../shared/models/user.model";
import { localize } from "nativescript-localize";
import * as localstorage from "nativescript-localstorage";
import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";
import { ImagesService } from "../shared/api/images/images.service";
import { openApp } from "nativescript-open-app";

var utils = require("utils/utils");


@Component({
  selector: 'ns-profilevisited',
  templateUrl: './profilevisited.component.html',
  styleUrls: ['./profilevisited.component.css'],
  moduleId: module.id,
})
export class ProfilevisitedComponent implements OnInit {

	@ViewChild("carouselO", {static: false}) carouselRef: ElementRef;
	private carousel: Carousel;

	@ViewChild("maintitle", {static: false}) stackMainTitle: ElementRef;
	titleNativeStack: GridLayout;

	public userIdentification: string;
	public userIdentificationvisited: string;
	public urlImage: string;
	public nameUser: string;
  public nickUser: string;
	public cityUser: string;
	public followers: string;
	public following: string;
	public lintereses: any;
	public userLogData: any;
	// public newImage: Image;  
	// public carouselItem: CarouselItem;
  	private linteresesDown: any;
  	private linteresesUp: any;
  	private dealsSubscribe: any = [];
  	public isBusy = false;
	public labelfollowbutton: string;  	
  	public showDetails = "collapsed";
    public showNet = "collapsed";
  	public responseUsersFollow: Usersfollow[];
  	public userLoginRecordUser: User;
  	public userLoginRecordComplete: any;
    public showDetails_= "collapsed";

	constructor(private page: Page,
                private userApiService: UserapiService, 
                private _routerExtensions: RouterExtensions, 
                // private dealsprofileService: DealsprofileService,
                // private markerprofileService: MarkerprofileService, 
                private usersfollowService: UsersfollowService, 
                private data: Data,
				private dealsprofileService: DealsprofileService, 
				private usersinterestsService: UsersinterestsService,
        		private markerprofileService: MarkerprofileService, 
        		private dealsqrcodeService: DealsqrcodeService,
            private imagesService: ImagesService) {

	    // this.page.actionBarHidden = true;
        this.linteresesDown = [];
	    this.linteresesUp = [];

        if(this.data.storage_varc!=null){
	      this.dealsSubscribe = this.data.storage_varc;
	    }else{
	      this.dealsSubscribe = [];
	    }

	    console.log("******** Deals " + JSON.stringify(this.dealsSubscribe));

	    this.userLogData = this.data.storage_varb;

      console.log("this.data.storage_varb __ userLogData " + JSON.stringify(this.userLogData));

	    this.userIdentificationvisited = this.userLogData._id;

	    this.urlImage = this.userLogData.picturehome;
	    this.nameUser = this.userLogData.name;
      this.nickUser = this.userLogData.username
	    this.cityUser = this.userLogData.city;
	    this.followers = this.userLogData.followers;
	    this.following = this.userLogData.following;
      if(this.userLogData.approvedinfluencer===true){
        this.showDetails_ = "visible";
      }else{
        this.showDetails_ = "collapsed";
      }


	    this.lintereses = this.data.storage_vara;

	    console.log("Deals " + JSON.stringify(this.dealsSubscribe));

	    for(var i=0; i<this.lintereses.length; i++){
	      if(i > 8 ){
	        this.linteresesUp.push(this.lintereses[i])  
	      } else{
	        this.linteresesDown.push(this.lintereses[i])
	      }
	    }	    

	}

	ngOnInit() {

		// if (nsPlatform.device.model.includes("11")){
		//     this.titleNativeStack.paddingTop = 93;
		// }else{
		//     this.titleNativeStack.paddingTop = 49;
		// }


	    if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userLoginRecordComplete = userLoginRecord;
            this.userLoginRecordUser = userLoginRecord.info;
            this.userIdentification = userLoginRecord.info._id;
        }		


	    this.userLogData = this.data.storage_varb;

	    this.userIdentificationvisited = this.userLogData._id;

		//verificar si usuario inicia sesion
        if(this.userIdentification!=null){

        // if(this.userIdentification!=null && this.userIdentification != this.userIdentificationvisited){ 
          if(this.userIdentification != this.userIdentificationvisited){ 
            this.showNet = "visible"
            this.showDetails="visible";
            //verificar si usuario es seguido o no para colocar label
            this.isFollower(this.userIdentification, this.userIdentificationvisited).then(dataResponse => {                       

              this.responseUsersFollow = dataResponse;

              if(this.responseUsersFollow.length>0){
  	            if(this.responseUsersFollow[0].status == false){
  	              this.labelfollowbutton = localize("follow");

  	            }else if(this.responseUsersFollow[0].status == true){
  	              this.labelfollowbutton = localize("unfollow");
  	            }            	
              }else{
              	this.labelfollowbutton = localize("follow");
              }



            });
          }else
          {

            this.showNet = "collapsed"
          }

        }else{
            
          this.showNet = "visible";  
          
          this.showDetails="collapsed";
        }		       	

  	}

	ngAfterViewInit() {

      this.titleNativeStack = this.stackMainTitle.nativeElement;

      this.carousel = this.carouselRef.nativeElement;

      //Get number model of iphone
      let modelSplit = nsPlatform.device.model.split("iPhone");
      let textModel = modelSplit[1].split(",");
      let numberModel = parseInt(textModel[0]);

      console.log("Number model "+numberModel);

      // if (nsPlatform.device.model.includes("11")){
      if (numberModel >= 11){
          // this.titleNativeStack.paddingTop = 49;
          // this.titleNativeStack.paddingTop = 93;
          this.titleNativeStack.paddingTop = 49;


      }else{
          this.titleNativeStack.paddingTop = 20;
      }        
        
      this.fillCarousel();

	}

	private fillCarousel(){
		// const carousel = this.carouselRef.nativeElement as Carousel;

    console.log("Size len " + this.dealsSubscribe.length);

		if(this.dealsSubscribe.length>0){

		  for(var j=0; j<this.dealsSubscribe.length; j++){

        const carouselItem = new CarouselItem(); 

        this.getImageFilter(this.dealsSubscribe[j].dealid.img).then(dataImage=> {

  		    const newImage = new Image();          
  		    // this.newImage.src = "res://"+this.dealsSubscribe[j].dealid.img;
          newImage.src = fromBase64(dataImage.imagesource);
  		    newImage.stretch = "fill";  		    
  		    carouselItem.addChild(newImage);               
  		    // carousel.addChild(carouselItem);

        });

        this.carousel.addChild(carouselItem);  

		  }

		}else{
		  const newImage = new Image();          
		  newImage.src = "res://empty";
		  newImage.stretch = "fill";
		  const carouselItemEmpty = new CarouselItem(); 
		  carouselItemEmpty.addChild(newImage); 
		  this.carousel.addChild(carouselItemEmpty);        
		}

	}  	

    goviewmap() {

        this._routerExtensions.navigate(["viewmap"], {animated: false});

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

  	                        this.isBusy = false;
  	                        
  	                        this.data.storage_vara = arrayGroupBy;
  	                        this.data.storage_varb = myDataArray;

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
	    }else
	    {
			this._routerExtensions.navigate(["login"], {animated: false});
	    }    

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

  onClickFollow(){

    let objectUpdateUser = {} as User;
    let objectUpdateUserVisited = {} as User;    
    let objectUpdateFollowers = {} as Usersfollow;

    if(this.responseUsersFollow.length == 0){
      this.labelfollowbutton = localize("unfollow");
      objectUpdateUser.following = this.userLoginRecordUser.following + 1;
      objectUpdateUserVisited.followers = this.userLogData.followers + 1;
      //save table usersfollow
      objectUpdateFollowers.userid = this.userIdentification;
      objectUpdateFollowers.useridfollow = this.userIdentificationvisited;
      objectUpdateFollowers.status = true;
      this.postUserFollower(objectUpdateFollowers).then(dataResponse => {
        console.log("Save User_User " + JSON.stringify(dataResponse));
        this.responseUsersFollow = [];
        this.responseUsersFollow.push(dataResponse);
      });
    }else if(this.responseUsersFollow[0].status == false){
      this.labelfollowbutton = localize("unfollow");
      objectUpdateUser.following = this.userLoginRecordUser.following + 1;
      objectUpdateUserVisited.followers = this.userLogData.followers + 1;
      //update table users_markers
      objectUpdateFollowers.status = true;
      this.putUserFollower(this.userIdentification, this.userIdentificationvisited, objectUpdateFollowers).then(dataResponse => {
        console.log("Update User_User " + JSON.stringify(dataResponse));
        this.responseUsersFollow[0].status = dataResponse.status;
      });      
    }else if(this.responseUsersFollow[0].status == true){
      this.labelfollowbutton = localize("follow");
      objectUpdateUser.following = this.userLoginRecordUser.following - 1;
      objectUpdateUserVisited.followers = this.userLogData.followers - 1;
      //update table users_markers
      objectUpdateFollowers.status = false;
      this.putUserFollower(this.userIdentification, this.userIdentificationvisited, objectUpdateFollowers).then(dataResponse => {
        console.log("Update User_Marker " + JSON.stringify(dataResponse));
        this.responseUsersFollow[0].status = dataResponse.status;
      });
    }

    this.putUserFinalFollower(this.userLoginRecordUser._id, objectUpdateUser).then(dataResponse => {
      	this.userLoginRecordComplete.info.following = dataResponse.following
  	    localStorage.removeItem('ResultLogin');
		localstorage.setItem('ResultLogin', JSON.stringify(this.userLoginRecordComplete));
      	// console.log(this.userLoginRecordUser);
	    this.putUserFinalFollower(this.userIdentificationvisited, objectUpdateUserVisited).then(dataResponseAux => {
	      this.userLogData.followers = dataResponseAux.followers;

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

  	async getDealsSubscribe(userId: string) {

      try {
          const users_deals: any = await this.dealsqrcodeService.getAllDealsSubscribe(userId);
          return users_deals;
      } catch(err) {
          console.log(err);
      }
      
  	} 

    onBusyChanged(args) {
        let indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    }

    async isFollower(userid, useridfollow) {

        try {
            const countRecords: Usersfollow[] = await this.usersfollowService.getRecordFollow(userid, useridfollow);
            return countRecords;
        } catch(err) {
            console.log(err);
        }
        
    }

    async putUserFollower(userid, useridfollow, objectUpdate: Usersfollow) {

        try {
            const user_profile: Usersfollow = await this.usersfollowService.updateFollowersUser(userid, useridfollow, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_profile;
        } catch(err) {
            console.log(err);
        }
        
    }

    async postUserFollower(objectUpdate: Usersfollow) {

        try {
            const user_profile: Usersfollow = await this.usersfollowService.saveFollowersUser(objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_profile;
        } catch(err) {
            console.log(err);
        }
        
    } 

    async putUserFinalFollower(userid, objectUpdate: User) {

        try {
            const user_profile: User = await this.userApiService.updateUser(userid, objectUpdate);
            // var dealsprofilecontent: any = JSON.parse(deals_profile); 
            return user_profile;
        } catch(err) {
            console.log(err);
        }
        
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

    getFollowingInfo() {
      // if(this.userLogData.following!=0){

          let jsonuseraux = "";
          jsonuseraux = localstorage.getItem('ResultLogin');

          if( jsonuseraux == null)
              this._routerExtensions.navigate(["login"], {animated: false});
          else{

              let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "idUserSearched": this.userIdentificationvisited
                      // "dataUser": JSON.stringify(this.userLogData),
                      // "dataInterest": JSON.stringify(this.lintereses) 
                    }
              };          
              
              this._routerExtensions.navigate(["followingextended"], navigationExtras);

          }
        // }      
    }

    getFollowersInfo() {

      //if(this.userLogData.followers!=0){

          let jsonuseraux = "";
          jsonuseraux = localstorage.getItem('ResultLogin');

          if( jsonuseraux == null)
              this._routerExtensions.navigate(["login"], {animated: false});
          else{
              
              let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "idUserSearched": this.userIdentificationvisited
                      // "dataUser": JSON.stringify(this.userLogData),
                      // "dataInterest": JSON.stringify(this.lintereses) 
                    }
              };
              
              this._routerExtensions.navigate(["follower"], navigationExtras);

          }
      //}  
    }    

    goInstApp(){
      console.log("nickUser " + this.nickUser);
      var installed = openApp("instagram://user?username="+this.nickUser, false);
      if (!installed) {
          utils.openUrl("https://instagram.com");
      }      
    }

}//fin clase
