import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Label } from "tns-core-modules/ui/label";
import * as nsPlatform from "nativescript-platform";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { NavigationExtras } from "@angular/router";


import * as localstorage from "nativescript-localstorage";
import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { Data } from "../providers/data/data";
import { RouterExtensions } from "nativescript-angular/router";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";

import { ImagesService } from "../shared/api/images/images.service";
import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";




@Component({
  selector: 'ns-inboxdetail',
  templateUrl: './inboxdetail.component.html',
  styleUrls: ['./inboxdetail.component.css'],
  moduleId: module.id,
})
export class InboxdetailComponent implements OnInit {

	@ViewChild("maintitle") stackMainTitle: ElementRef;
	titleNativeStack: GridLayout;

	@ViewChild("gridmain") stackMainContent: ElementRef;
	contentNativeStack: GridLayout;			

  	msj_detail: any;	

  	public isBusy = false;  	

    imageDeal: ImageSource;

	userIdentification: string;  	

  	constructor(private _routerExtensions: RouterExtensions,
  		private route: ActivatedRoute,   		
  		private usersdealsService: UsersdealsService,
  		private data: Data,
  		private dealsprofileService: DealsprofileService,
  		private usersinterestsService: UsersinterestsService,
  		private markerprofileService: MarkerprofileService,
      private imagesService: ImagesService) { 

		if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userIdentification = userLoginRecord.info._id;
        }  		

        this.route.queryParams.subscribe(params => {
            this.msj_detail = JSON.parse(params["DetailMsj"]);
        });

        this.getImageFilter(this.msj_detail[0].dealid.img).then(dataImages=> { 
            this.imageDeal = fromBase64(dataImages.imagesource);
        });

        console.log("[*] " + JSON.stringify(this.msj_detail));

  	}

	ngOnInit() {

		this.titleNativeStack = this.stackMainTitle.nativeElement;

		this.contentNativeStack = this.stackMainContent.nativeElement;

    	//Get number model of iphone
	    let modelSplit = nsPlatform.device.model.split("iPhone");
	    let textModel = modelSplit[1].split(",");
	    let numberModel = parseInt(textModel[0]);	

	    if (numberModel >= 11){
	        this.titleNativeStack.paddingTop = 49;

	    }else{
	        this.titleNativeStack.paddingTop = 20;
	    }	  

		// const newImage = new Image();          
		// newImage.src = "res://" + msj_detail[0].img;
		// newImage.stretch = "aspectFill";
		// newImage.height = "207"
		// newImage.width = "375"

	}

    goViewDeal(){

      if(this.userIdentification!=null){

          this.getDeal(this.msj_detail[0].dealid._id).then(dealResponse => {

              let arrayDealProfile = [];

              arrayDealProfile.push(dealResponse);

              console.log("Response Service : " + JSON.stringify(arrayDealProfile));

              let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "DealMarker": JSON.stringify(arrayDealProfile)
                    }
              };
              this._routerExtensions.navigate(['dealprofile'], navigationExtras);
          });          
      }else
      {
          this._routerExtensions.navigate(["login"], {animated: false});
      }


    }

    goviewmap() {
        this._routerExtensions.navigate(["viewmap"], {animated: false});
    }

    gosearch() {
        this._routerExtensions.navigate(["search"], {animated: false});
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
        }else{
          this._routerExtensions.navigate(["login"], {animated: false});
        }
    }    

	async getDealsSubscribe(userId: string) {

	  try {
	      const users_deals: any = await this.usersdealsService.getAllDealsSubscribe(userId);
	      console.log("******* " + JSON.stringify(users_deals));
	      // var dealsprofilecontent: any = JSON.parse(deals_profile); 
	      return users_deals;
	  } catch(err) {
	      console.log(err);
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

    // Extra funcionalidad

    async getDeal(dealId: string) {

      try {
          const deal_profile: Dealsprofile = await this.dealsprofileService.getSpecificDeal(dealId);

          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return deal_profile;
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


}
