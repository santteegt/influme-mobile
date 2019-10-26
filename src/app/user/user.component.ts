import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
// import { NgZone } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
// import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { NavigationExtras } from "@angular/router";
import * as localstorage from "nativescript-localstorage";

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";

import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

const localize = require("nativescript-localize");
import { Switch } from "tns-core-modules/ui/switch";

import { TextField } from "tns-core-modules/ui/text-field";
// import * as request from "request-promise-native"
import { UserapiService } from "../shared/api/user/userapi.service";
import { User } from "../shared/models/user.model";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import * as nsPlatform from "nativescript-platform";




@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  moduleId: module.id,
})
export class UserComponent implements OnInit {

  @ViewChild("maintitle", {static: false}) stackMainTitle: ElementRef;
  titleNativeStack: StackLayout;   

  public lnname: string;
  public lname: string;
  public txtfieldcity: string;
  public txtfieldmail: string;
  public imageurl: string; 
  
  private feedback: Feedback;

  public turnInfluencer: boolean = false;
  private userLogData: any;
  private userProfile: User;
  
  private label_button: string;
  private showDetails: string;
  private menuOption: any;
  private showDetails1: string;

  locations = [];


  constructor(private route: ActivatedRoute, private _routerExt: RouterExtensions, private page: Page,
                private userApiService: UserapiService) { 

      this.page.actionBarHidden = true;

      this.feedback = new Feedback();

      this.enableLocationTap();
      this.buttonGetLocationTap();

      this.menuOption = -1;

      this.route.queryParams.subscribe(params => {
          this.menuOption = params["menuOption"];
      });

      if(this.menuOption == 1){
        this.label_button = localize("edit");
        this.showDetails = "collapsed";
        this.showDetails1 = "visible";


      }else if(this.menuOption == 0){
        this.label_button = localize("button.continue");
        this.showDetails = "visible";
        this.showDetails1 = "collapsed";

      }

      //  this.page.backgroundSpanUnderStatusBar = true;    
      // this._routerExtensions.params.forEach((params) => { this.token = params["info"]; });
      // this.route.queryParams.subscribe(params => { this.token = params["info"]; });

      let infoUser = localstorage.getItem('ResultLogin');

      // if(infoUser == null){
      //     infoUser = localStorage.getItem('ResultLogin');         
      // }

      this.userLogData = JSON.parse(infoUser);
      this.userProfile = this.userLogData.info;

      console.log("Login.info -> user :" + JSON.stringify(this.userProfile));
       
      // **const vm = new Observable();
      //this.lnname = UserLogData["nickname"];
      //console.log('entry');
      //console.log(jwt);
    	// const usuario: string = jwt(this.token['idToken']);
      //  console.log("luego del decode");
    	// console.log (JSON.stringify(usuario));
    	//vm.set("imageurl", usuario['picture']);
	    // **vm.set("lnname", this.userLogData["nickname"]);
    	//vm.set("lname", usuario['name']);
    	
      //this.page.bindingContext = vm;   
      //console.log(vm);
      
      //const view = <Page>args.object;
      //view.bindingContext = vm;

      //StackLayout.bindingContext = vm;

    	this.lnname = this.userProfile.username;
    	this.lname = this.userProfile.name;
    	this.imageurl = this.userProfile.picturehome;
      this.txtfieldcity = this.userProfile.city;
      this.txtfieldmail = this.userProfile.email;
      this.turnInfluencer = this.userProfile.influencer;


      // this.jsonDataUser = {
      //   "nameU": this.lname,
      //   "cityU": "Cuenca, Ecuador",
      //   "imageU": this.imageurl
      // }

      // this.userLogData["name"] = this.lname;
      // this.userLogData["pictureURL"] = this.imageurl;


      // this.userLogData = {
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

    this.titleNativeStack = this.stackMainTitle.nativeElement;

    //Get number model of iphone
    let modelSplit = nsPlatform.device.model.split("iPhone");
    let textModel = modelSplit[1].split(",");
    let numberModel = parseInt(textModel[0]);

    console.log("Number model "+numberModel);

    // if (nsPlatform.device.model.includes("11")){
    if (numberModel >= 11){
        this.titleNativeStack.paddingTop = 93;            
    }else{
        this.titleNativeStack.paddingTop = 20;
    }    

    // if (nsPlatform.device.model.includes("11")){

    //     this.titleNativeStack.paddingTop = 93;
    // }else{
    //     this.titleNativeStack.paddingTop = 49;
    // }

  }

  continue() {

      this.userProfile.city = this.txtfieldcity;
      this.userProfile.email = this.txtfieldmail;
      console.log("handle checked continue() "+this.turnInfluencer);
      this.userProfile.influencer = this.turnInfluencer;      
      this.userLogData.info = this.userProfile;
      this.navigateInterest();
  }

  goback(){
    localStorage.removeItem('ResultLogin');
    this._routerExt.back();    
  }

	private navigateInterest() {

      console.log("Verifica txtfieldcity " + this.txtfieldcity);
      console.log("Verifica txtfieldmail " + this.txtfieldmail);

      if(this.txtfieldcity != "" && this.txtfieldmail != ""){

            localStorage.removeItem('ResultLogin');
            localstorage.setItem('ResultLogin', JSON.stringify(this.userLogData));                        

              // let navigationExtras: NavigationExtras = {
              //     queryParams: {
              //         "info": JSON.stringify(this.jsonDataUser)
              //   }
              // };      
              // this._routerExt.navigate(["interest"], navigationExtras);
              if(this.menuOption == 0){

                let editOption = 0;
                let navigationExtras: NavigationExtras = {
                queryParams: {
                      "menuOption": editOption
                }};
                
                this._routerExt.navigate(["interest"], navigationExtras);

              }else if(this.menuOption == 1){

                  this.userProfile.city = this.txtfieldcity;
                  this.userProfile.email = this.txtfieldmail;   
                  console.log("handle checked edit() "+this.turnInfluencer);               
                  if(this.turnInfluencer===false && this.userProfile.influencer===true){

                    this.userProfile.approvedinfluencer=null;

                  }
                  this.userProfile.influencer = this.turnInfluencer;
                  this.updateAccountUser(this.userProfile._id, this.userProfile).then(responseSaveUser => {
                    if(responseSaveUser.error!=null){
                      this.printError("message_user_save_error");
                    }else{
                      this._routerExt.navigate(["profile"]);  
                    }
                    
                  });
              }      
      }else{

          console.log("ERROR !!!!!!" );
        
          this.printError("message_user_fields_error")
      }

  }

  public enableLocationTap() {
      geolocation.isEnabled().then(function (isEnabled) {
          if (!isEnabled) {
              geolocation.enableLocationRequest().then(function () {
              }, function (e) {
                  console.log("Error: " + (e.message || e));
              });
          }
      }, function (e) {
          console.log("Error: " + (e.message || e));
      });
  }

  goBackProfile(){
       this._routerExt.navigate(["profile"]); 
  }
  

  public buttonGetLocationTap() {
      // let that = this;
      geolocation.getCurrentLocation({
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 10000
      }).then(function (loc) {
          if (loc) {

            getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&key=AIzaSyBD71DgYMShdu8PD0x7waGLBPBgZjAZKes").then((r: any) => {
              console.log(JSON.stringify(r));
            }, (e) => {
              console.log("Error" + e);
            })
              // let options = {
              //     uri: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&sensor=true",
              // };
              // const result = await request.get(options);
              // request.get(options).then((result: string) => console.log(result));
              // console.log("{****} ADDRESS: " + result);
            // let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&sensor=true";
            // this.http.get(url)
            //     .map(results => results.json())
            //     .subscribe(results => {
            //             console.log("address " + results.results[0].formatted_address);
            //     }, error => {
            //         console.log("ERROR: ", error);
            //     });  

            console.log("Location: "+ JSON.stringify(loc));
            // that.locations.push(loc);
          }
      }, function (e) {
          console.log("Error: " + (e.message || e));
      });
  }

  printError(textError){
      this.feedback.show({
            title: "Error Selection",
            message: localize(textError),
            duration: 1400,
            titleFont: "SFProDisplay-Bold",
            titleSize: 16,
            messageFont: "SFProDisplay-Regular",
            messageSize: 13,
            type: FeedbackType.Error,
            onTap: () => {
              console.log("showError tapped");
            }
          });
  }  

public onFirstChecked(args) {
        let firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            console.log("handle checked ");
            this.turnInfluencer = true;
        } else {            
            console.log("handle unchecked ");          
            this.turnInfluencer = false;
        }
    }

onBlurCity(args) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;

    this.txtfieldcity = textField.text;    
}    

onBlurEmail(args) {
    // blur event will be triggered when the user leaves the TextField
    let textField = <TextField>args.object;

      this.txtfieldmail = textField.text;
}    


  async updateAccountUser(idUser: string, bodySave: User) {

    console.log("Objeto User a actualizar " + JSON.stringify(bodySave));

      try {
          const userprofile_: User = await this.userApiService.updateUser(idUser, bodySave);
          console.log("Objeto de retorno de create Account " + JSON.stringify(userprofile_));
          return userprofile_;
      } catch(err) {
          console.log(err);
      }
      
  }


}
