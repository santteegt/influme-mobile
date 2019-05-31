import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Label } from "tns-core-modules/ui/label";
import { Image } from "tns-core-modules/ui/image";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { NavigationExtras } from "@angular/router";
import * as nsPlatform from "nativescript-platform";
import * as localstorage from "nativescript-localstorage";

import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";

import { Usersinterestsextend } from "../shared/models/usersinterestsextend.model";

import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";
import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { Usersdeals } from "../shared/models/usersdeals.model";
import { Data } from "../providers/data/data";

import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

import { UserapiService } from "../shared/api/user/userapi.service";
import { User } from "../shared/models/user.model";

import { ImagesService } from "../shared/api/images/images.service";

import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";

import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  moduleId: module.id,
})
export class SearchComponent implements OnInit, OnDestroy{

  // @ViewChild("myNgStackLabel") stackRefLabel: ElementRef;
  // myNativeStackLabel: StackLayout;

  // @ViewChild("myNgStackImage") stackRefImage: ElementRef;
  // myNativeStackImage: StackLayout;

  // @ViewChild("myNgStackIcon") stackRefIcon: ElementRef;
  // myNativeStackIcon: StackLayout;    

  searchControl = new FormControl();
  subscription: Subscription;

  @ViewChild("myNgStack") stackRef: ElementRef;
  myNativeStack: StackLayout;

  @ViewChild("maintitle") stackMainTitle: ElementRef;
  titleNativeStack: GridLayout;    

  public newLabel: Label;
  public newImage: Image;
  public newImageIcon: Image;
  public newGridLayout: GridLayout;
  public newGridLayout1: GridLayout;
  public newStackLayoutLabel: StackLayout;
  public newStackLayoutImage: StackLayout;
  public newStackLayoutIcon: StackLayout;
  public newStackLayout: StackLayout;
  public marker_profile: Markerprofile[] = [];
  public marker_profile_element: Markerprofile;
  public isBusy = false;
  userIdentification: string;
  // public newStackImage: StackLayout;


  searchPhrase: string = "";

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page,
    private ngZone: NgZone, private dealsprofileService: DealsprofileService, 
    private usersinterestsService: UsersinterestsService, private markerprofileService: MarkerprofileService, 
    private usersdealsService: UsersdealsService, private data: Data, private userapiService: UserapiService,
    private imagesService: ImagesService) { 
    this.page.actionBarHidden = true;
        
        if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userIdentification = userLoginRecord.info._id;
        }   

  }

  ngOnInit() {    


      this.subscription = this.searchControl.valueChanges
        .pipe(debounceTime(1100))
        .subscribe((value) => {
            console.log(">>>>>>>>> " + value);
        });      
  

    // this.myNativeStackLabel = this.stackRefLabel.nativeElement;
    // this.myNativeStackImage = this.stackRefImage.nativeElement;
    // this.myNativeStackIcon = this.stackRefIcon.nativeElement;
    this.myNativeStack = this.stackRef.nativeElement;

  this.titleNativeStack = this.stackMainTitle.nativeElement;
  // this.menuNativeStack = this.stackMenubar.nativeElement;


  if (nsPlatform.device.model.includes("11")){

      this.titleNativeStack.paddingTop = 93;

  }else{
      this.titleNativeStack.paddingTop = 49;
  }   

  }

  public searchBarLoaded(args) {
      let searchBar = <SearchBar>args.object;
      searchBar.dismissSoftInput();

      // if (isAndroid) {
      //     searchBar.android.clearFocus();
      // }

      searchBar.text = "";
  }

  public onTextChange(args) {   

      this.myNativeStack.removeChildren();

      // let allResults: any = [];
      let searchBar = <SearchBar>args.object;  

      if(searchBar.text){
        
        this.getMarkerProfile(searchBar.text).then(dataM => {

          this.myNativeStack.removeChildren();
          this.marker_profile = dataM;

          this.getUserInterestsProfile(searchBar.text).then(dataUserResponse => {

            this.myNativeStack.removeChildren();

            let userProfile: any={};
            let interestsProfile = [];
            let userSearchProfile = [];
            
            let allUsers: any;
            let onlyUser: any;

            dataUserResponse = dataUserResponse.filter(useritem => useritem.userid != null);

            //Get all idUser
            allUsers = dataUserResponse.map(function(userList) {
                return userList.userid._id;
            });             

            //Remove duplicate ids 
            allUsers = allUsers.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
            })            

            allUsers.forEach(function(element) {

              onlyUser = dataUserResponse.filter(useritem => useritem.userid._id === element);
              onlyUser.forEach(function(row) {                  
                userProfile.info = row.userid;
                interestsProfile.push(row.typeid)
              });
              
              userProfile.interests = interestsProfile;                  
              userSearchProfile.push(userProfile);
              userProfile = {};
              interestsProfile = [];

            });

            // Mostrar en pantalla los resultados de usuario 
            this.fillViewUsers(userSearchProfile);

            // busqueda de restaurantes
            dataM.forEach(async (elementMarker, index) => { 

              var mpelement = elementMarker;
              var i = index;
                         
              // get images from mongodb de los restaurantes
              this.getImageFilter(elementMarker.images[0]).then(dataImages=> {

                  this.fillViewMarkers(dataImages, mpelement, i)

              });        

            });            

          });
      });
    }
  }

  public fillViewMarkers(dataImages, mpelement, i){

        // Label con titulo de local
        this.newLabel = new Label();          
        this.newLabel.text = mpelement.title;
        this.newLabel.className = "label-search";

        // Imagen de perfil
        this.newImage = new Image();          
        this.newImage.src = fromBase64(dataImages.imagesource);
        this.newImage.stretch = "fill";
        this.newImage.style.width = 55;
        this.newImage.style.height = 55;
        this.newImage.style.borderRadius = 61;

        // Imagen de tipo de local
        this.newImageIcon = new Image();          
        this.newImageIcon.src = "res://" + mpelement.type.icontype;
        this.newImageIcon.stretch = "fill";
        this.newImageIcon.style.width = 8;
        this.newImageIcon.style.height = 14;
        this.newImageIcon.style.borderRadius = 4;

        // StackLayout para label
        this.newStackLayoutLabel = new StackLayout();
        // this.newStackLayoutLabel.style.backgroundColor = new Color("#860075");
        this.newStackLayoutLabel.horizontalAlignment = "left";            
        this.newStackLayoutLabel.marginTop = 10;
        this.newStackLayoutLabel.marginLeft = 104;              
                      
        this.newStackLayoutLabel.addChild(this.newLabel);


        // StackLayout para imagen de tipo de local
        this.newStackLayoutIcon = new StackLayout();
        this.newStackLayoutIcon.style.backgroundColor = new Color("#d9d6e1");
        this.newStackLayoutIcon.width = 21;
        this.newStackLayoutIcon.height = 21;
        this.newStackLayoutIcon.style.borderRadius = 4;
        this.newStackLayoutIcon.marginTop = 25;
        this.newStackLayoutIcon.marginLeft = 104;
        this.newStackLayoutIcon.horizontalAlignment = "left";
        this.newStackLayoutIcon.verticalAlignment = "middle";
        this.newStackLayoutIcon.addChild(this.newImageIcon);

        // StackLayout para imagen de perfil
        this.newStackLayoutImage = new StackLayout();
        // this.newStackLayoutImage.style.backgroundColor = new Color("#867fbd");
        this.newStackLayoutImage.horizontalAlignment = "left"
        this.newStackLayoutImage.marginTop = 5;
        this.newStackLayoutImage.marginLeft = 36;                         

        this.newStackLayoutImage .addChild(this.newImage);

        // GridLayout Principal
        this.newGridLayout = new GridLayout();          
        this.newGridLayout.id = mpelement._id;
        this.newGridLayout.backgroundColor = new Color("white");
        this.newGridLayout.addChildAtCell(this.newStackLayoutImage, i, 0);                          
        this.newGridLayout.addChildAtCell(this.newStackLayoutLabel, i, 0);            
        this.newGridLayout.addChildAtCell(this.newStackLayoutIcon, i, 0);           
        this.newGridLayout.addRow(new ItemSpec(0, GridUnitType.AUTO));
        this.newGridLayout.on(GestureTypes.tap, function (args: GestureEventData ) { 
          let grid = <GridLayout>args.object;           
          let json_deal_selected: Markerprofile[] = this.marker_profile.filter(d => d._id === grid.id);
          // let navigationExtras: NavigationExtras = {
          //     queryParams: {
          //         // "MarkerProfile": JSON.stringify(json_deal_selected)
          //         "MarkerProfile": JSON.stringify(json_deal_selected[0])
          //       }
          // };
          this.data.storage_vara = json_deal_selected[0];
          this.ngZone.run(() => this._routerExtensions.navigate(['markerprofile'])).then();
          // this._routerExtensions.navigate(["markerprofile"], navigationExtras);

        }, this);             
        this.newGridLayout.height=75;
        // this.newGridLayout.style.backgroundColor = new Color("#FF0000");
        this.myNativeStack.addChild(this.newGridLayout);   
  }
  
  public fillViewUsers(userSearchProfile){

        if(userSearchProfile.length>0){

          for(var i=0; i<userSearchProfile.length; i++){

              // GridLayout Principal
              this.newGridLayout = new GridLayout();          
              this.newGridLayout.id = userSearchProfile[i].info._id;
              this.newGridLayout.backgroundColor = new Color("white");

              // GridLayout SECUNDARIO
              this.newGridLayout1 = new GridLayout();          
              this.newGridLayout1.backgroundColor = new Color("white");                  
              this.newGridLayout1.height = 25;                  
              this.newGridLayout1.marginLeft = 104;

              // Label con titulo de local
              this.newLabel = new Label();          
              this.newLabel.text = userSearchProfile[i].info.name;
              this.newLabel.className = "label-search";

              // Imagen de perfil
              this.newImage = new Image();          
              this.newImage.src = userSearchProfile[i].info.picturehome;
              this.newImage.stretch = "fill";
              this.newImage.style.width = 55;
              this.newImage.style.height = 55;
              this.newImage.style.borderRadius = 61;

              // StackLayout para label
              this.newStackLayoutLabel = new StackLayout();
              this.newStackLayoutLabel.horizontalAlignment = "left";            
              this.newStackLayoutLabel.height = 75;
              this.newStackLayoutLabel.marginTop = 10;
              this.newStackLayoutLabel.marginLeft = 104;                                            
              this.newStackLayoutLabel.addChild(this.newLabel);

              // StackLayout para imagen de perfil
              this.newStackLayoutImage = new StackLayout();
              this.newStackLayoutImage.horizontalAlignment = "left"
              this.newStackLayoutImage.marginTop = 5;
              this.newStackLayoutImage.marginLeft = 36;                         
              this.newStackLayoutImage .addChild(this.newImage);


              // Imagen de tipo de local
              for(var j=0; j<userSearchProfile[i].interests.length; j++){

                  // StackLayout para imagen de tipo de local
                  this.newStackLayoutIcon = new StackLayout();
                  this.newStackLayoutIcon.style.backgroundColor = new Color("#d9d6e1");
                  this.newStackLayoutIcon.width = 21;
                  this.newStackLayoutIcon.height = 21;
                  this.newStackLayoutIcon.style.borderRadius = 4;
                  // this.newStackLayoutIcon.marginTop = 25;
                  // this.newStackLayoutIcon.marginLeft = 104;
                  this.newStackLayoutIcon.horizontalAlignment = "left";
                  this.newStackLayoutIcon.verticalAlignment = "middle";

                  this.newImageIcon = new Image();          
                  this.newImageIcon.src = "res://" + userSearchProfile[i].interests[j].icontype;
                  this.newImageIcon.stretch = "fill";
                  this.newImageIcon.style.width = 8;
                  this.newImageIcon.style.height = 14;
                  this.newImageIcon.style.borderRadius = 4;
                  this.newStackLayoutIcon.addChild(this.newImageIcon);
                  this.newGridLayout1.addChildAtCell(this.newStackLayoutIcon, i, j);  
                  this.newGridLayout1.addColumn(new ItemSpec(28, GridUnitType.PIXEL));                                                 
              }

              this.newGridLayout.addChildAtCell(this.newStackLayoutImage, i, 0);                          
              this.newGridLayout.addChildAtCell(this.newStackLayoutLabel, i, 0);
              this.newGridLayout.addChildAtCell(this.newGridLayout1, i, 0);
              this.newGridLayout.addRow(new ItemSpec(0, GridUnitType.AUTO));
              this.newGridLayout.on(GestureTypes.tap, function (args: GestureEventData ) { 
                let grid = <GridLayout>args.object;           
                let json_user_selected: any = userSearchProfile.filter(d => d.info._id === grid.id);
                let intereses: any = [];
                let subIntereses: any = {};

                this.data.storage_varb = json_user_selected[0].info;

                for(var i=0; i<json_user_selected[0].interests.length; i++){   
                  subIntereses = {};
                  subIntereses.id =  json_user_selected[0].interests[i]._id       
                  subIntereses.img = json_user_selected[0].interests[i].icontype;
                  subIntereses.width = "10.9";
                  subIntereses.height = "18";
                  intereses.push(subIntereses);      
                }                                      

                this.data.storage_vara = intereses;

                this.getDealsSubscribe(json_user_selected[0].info._id).then(dealsResponse => {
                  this.data.storage_varc = dealsResponse;
                  this.ngZone.run(() => this._routerExtensions.navigate(['profilevisited'])).then();
                });                      
                                      
              }, this);             
              this.newGridLayout.height=75;
              this.myNativeStack.addChild(this.newGridLayout);                  
                        
              }
          }

  } //En clase 

  // public onSubmit(args) {
  //     let searchBar = <SearchBar>args.object;
  //     this.searchPhrase = "Submited search query: " + searchBar.text;
  // }  

    async getMarkerProfile(titleName: string) {

        try {
            const marker_profile: Markerprofile[] = await this.markerprofileService.getMarkerprofile(titleName);
            return marker_profile;
        } catch(err) {
            console.log("[*] Error: " + err);
        }
        
    }

    async getUserInterestsProfile(username: string) {

        try {
            const user_profile: Usersinterestsextend[] = await this.usersinterestsService.getTypesFromUsersName(username);
            return user_profile;
        } catch(err) {
            console.log("[*] Error: " + err);
        }
        
    }

    // async getUserInterestsProfile(idUser: string) {

    //     try {
    //         const userinterest_profile: Usersinterests[] = await this.usersinterestsService.getTypesFromUsers(idUser);
    //         return userinterest_profile;
    //     } catch(err) {
    //         console.log("[*] Error: " + err);
    //     }
        
    // }        

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
        }else{
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

    clearTextFieldFocus(args){  
      let searchBar = <SearchBar>args.object;
      searchBar.dismissSoftInput();
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }    

}
