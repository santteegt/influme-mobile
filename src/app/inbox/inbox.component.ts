import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Label } from "tns-core-modules/ui/label";
import { Color } from "tns-core-modules/color";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import * as nsPlatform from "nativescript-platform";


import * as localstorage from "nativescript-localstorage";
// import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";

import { DealsqrcodeService } from "../shared/api/dealsqrcode/dealsqrcode.service";


import { Data } from "../providers/data/data";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { Usersinterests } from "../shared/models/usersinterests.model";
import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";

import { Inboxmessages } from "../shared/models/inboxmessages.model";
import { InboxmessagesService } from "../shared/api/inboxmessages/inboxmessages.service";



@Component({
  selector: 'ns-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  moduleId: module.id,
})
export class InboxComponent implements OnInit {

	@ViewChild("maintitle", {static: false}) stackMainTitle: ElementRef;
	titleNativeStack: GridLayout;	

	@ViewChild("stackmsj", {static: false}) stackRef: ElementRef;
	myNativeStack: StackLayout;

	public messagesList: any;	

  	public isBusy = false;

	userIdentification: string;  	

  	constructor(private _routerExtensions: RouterExtensions, private ngZone: NgZone,
  		private dealsqrcodeService: DealsqrcodeService,
      private inboxmessagesService: InboxmessagesService,
  		private data: Data,
  		private dealsprofileService: DealsprofileService,
  		private usersinterestsService: UsersinterestsService,
  		private markerprofileService: MarkerprofileService) { 


		if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userIdentification = userLoginRecord.info._id;
        }
		// this.messagesList = [
		
		// 	{
		// 	    "title": "New deals close to you! 🔥", "hora": "1h ago", "colortext": "color: #f13657;", "sepline": "11"
		// 	},
		// 	{
		// 	    "title": "MOM's Creation has a new deal for you!", "hora": "1h ago", "colortext": "color: #545355;", "sepline": "77"
		// 	},
		// 	{
		// 	    "title": "Your friends are starting following this new place, don’t stay behind!", "hora": "1h ago", "colortext": "color: #545355;", "sepline": "88"
		// 	}	
		// ];

		// this.messagesList = [
		
		// 	{
		// 	    "id":"msj1", 
		// 	    "title": "New deals close to you! 🔥", 
		// 	    "hora": "1h ago", 
		// 	    "colortext": "#f13657",
		// 	    "img": "inbox1.jpg",
		// 	    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //         "dealid": "5c8a90c2525bf21b65bcfa6e"
		// 	},
		// 	{
		// 	    "id":"msj2", "title": "MOM's Creation has a new deal for you!", "hora": "1h ago", "colortext": "#545355", "img": "inbox2.jpg",
		// 	    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //         "dealid": "5c8a90c3525bf21b65bcfa6f"          

		// 	},
		// 	{
		// 	    "id":"msj3", "title": "Your friends are starting following this new place, don’t stay behind!", "hora": "1h ago", "colortext": "#545355", "img": "inbox3.jpg",
		// 	    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //         "dealid": "5c8a90c3525bf21b65bcfa72"          
		// 	}	
		// ];		

  	}

  ngAfterViewInit() {

      this.titleNativeStack = this.stackMainTitle.nativeElement;
      this.myNativeStack = this.stackRef.nativeElement;   

      //Get number model of iphone
      let modelSplit = nsPlatform.device.model.split("iPhone");
      let textModel = modelSplit[1].split(",");
      let numberModel = parseInt(textModel[0]);

      if (numberModel >= 11){
          this.titleNativeStack.paddingTop = 49;            
      }else{
          this.titleNativeStack.paddingTop = 20;
      }

      this.getAllMessages().then(messagesResponse => {

          console.log("Mensajes ** " + JSON.stringify(messagesResponse));

          for(var j=0; j<messagesResponse.length; j++){

            const newLabelTitle = new Label();          
            newLabelTitle.text = messagesResponse[j].title;
            newLabelTitle.textWrap = true;
            newLabelTitle.style.fontFamily = "SFProDisplay-Bold";
            newLabelTitle.style.fontSize = 16;
            newLabelTitle.style.fontWeight = "bold";

            var msjHour = messagesResponse[j].datepost.split("T");
            const newLabelHour = new Label();          
            newLabelHour.text = msjHour[0];
            newLabelHour.style.fontFamily = "SFProDisplay-Regular";
            newLabelHour.style.fontSize = 12;
            // newLabelHour.style.color = new Color(this.messagesList[j].colortext);
            newLabelHour.style.color = new Color("#545355");

            
            const newStackLayoutSep = new StackLayout();            
            newStackLayoutSep.width = 307;
            newStackLayoutSep.height = 28;
            newStackLayoutSep.style.borderBottomColor = new Color("black");
            // newStackLayoutSep.style.borderBottomStyle = "solid";
            newStackLayoutSep.style.borderBottomWidth = 1;
            newStackLayoutSep.addChild(newLabelHour);
            
            const newStackLayout = new StackLayout();
            newStackLayout.id = messagesResponse[j]._id;
            newStackLayout.style.paddingTop = 11;
            newStackLayout.style.paddingLeft = 36;
            newStackLayout.style.paddingRight = 36;
            if(messagesResponse[j].title.length > 34){
              newStackLayout.height = 82;
            }else
            {
              newStackLayout.height = 63;       
            }
            newStackLayout.addChild(newLabelTitle);     
            newStackLayout.addChild(newStackLayoutSep); 
            newStackLayout.on(GestureTypes.tap, function (args: GestureEventData ) {

              let grid = <StackLayout>args.object;           

              let json_msj_selected: any = messagesResponse.filter(d => d._id === grid.id);      

              let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "DetailMsj": JSON.stringify(json_msj_selected)
                    }
              };
              this.ngZone.run(() => this._routerExtensions.navigate(['inboxdetail'], navigationExtras )).then();


            }, this);         

            this.myNativeStack.addChild(newStackLayout)   

          }
      });      


    }    

  	ngOnInit() {

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
	      const users_deals: any = await this.dealsqrcodeService.getAllDealsSubscribe(userId);
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

    // Extras    

    async getAllMessages() {

      try {
          const all_messages: Inboxmessages[] = await this.inboxmessagesService.getAllMessages();
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return all_messages;
      } catch(err) {
          console.log(err);
      }


    }
    

}
