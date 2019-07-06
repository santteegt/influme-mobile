import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import * as localstorage from "nativescript-localstorage";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { localize } from "nativescript-localize";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";

import { UserapiService } from "../shared/api/user/userapi.service";
import { User } from "../shared/models/user.model";

import { TypemarkerService } from "../shared/api/typemarker/typemarker.service";
import { Typemarker } from "../shared/models/typemarker.model";

import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import * as nsPlatform from "nativescript-platform";

import { Data } from "../providers/data/data";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";



@Component({
  selector: 'ns-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css'],
  moduleId: module.id
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestComponent implements OnInit {

  @ViewChild("maintitle") stackMainTitle: ElementRef;
  titleNativeStack: StackLayout;

  public myItems: Typemarker[];
  public userLogData: any;
  private feedback: Feedback;
  private label_button: string;
  private showDetails: string;
  private showDetails1: string;
  private menuOption: any;
  public isVisible: boolean;
  public isBusy = true;
  // public arrayUserInterests: Usersinterest;



  constructor(private route: ActivatedRoute, private page: Page, private _routerExtensions: RouterExtensions,
    private userapiService: UserapiService, private usersinterestsService: UsersinterestsService,
    private typemarkerService: TypemarkerService, private data: Data) { 

    this.feedback = new Feedback();
    
    this.page.actionBarHidden = true;

    this.route.queryParams.subscribe(params => {
          this.menuOption = params["menuOption"];
    });

    if(this.menuOption == 1){
      this.label_button = localize("edit");
      this.showDetails = "collapsed";
      this.showDetails1 = "visible";

    }else if(this.menuOption == 0){
      this.label_button = localize("create_account");
      this.showDetails = "visible";
      this.showDetails1 = "collapsed";

    }    

    // this.myItems = [
    // {
    //     "id": "1", "img":"res://icons/filterA", "pw":"10.9", "ph":"18", "type": "restaurant", "colorstack": "border-color: gray;", "opacityvalue": "0.5", "status": 0},
    // {
    //     "id": "2", "img":"res://icons/filterB", "pw":"10.9", "ph":"18", "type": "bar", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "3", "img":"res://icons/filterC", "pw":"9.6", "ph":"18", "type": "type3", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "4", "img":"res://icons/filterD", "pw":"15.1", "ph":"14.3", "type": "type4", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "5", "img":"res://icons/filterE", "pw":"19.2", "ph":"9", "type": "gym", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "6", "img":"res://icons/filterF", "pw":"10.9", "ph":"18", "type": "type6", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "7", "img":"res://icons/filterG", "pw":"10.9", "ph":"18", "type": "health", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "8", "img":"res://icons/filterH", "pw":"10.9", "ph":"18", "type": "airport", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "9", "img":"res://icons/filterI", "pw":"10.9", "ph":"18", "type": "climbing", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "10", "img":"res://icons/filterJ", "pw":"10.9", "ph":"18", "type": "music", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "11", "img":"res://icons/filterK", "pw":"10.9", "ph":"18", "type": "movies", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "12", "img":"res://icons/filterM", "pw":"10.9", "ph":"18", "type": "painting", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "13", "img":"res://icons/filterN", "pw":"10.9", "ph":"18", "type": "games", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    // {
    //     "id": "14", "img":"res://icons/filterO", "pw":"10.9", "ph":"18", "type": "hand", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0}    
    // ];


}

ngOnInit() {

    this.isVisible = false;
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
    

    this.getTypeMarkers().then(responseTypes => {      
        this.myItems = responseTypes;
        this.myItems.forEach(function(element) {
          element.status=0;    
          element.colorstack = "border-color: gray;";
          element.opacityvalue = "0.5"
        });

        this.isVisible = true;

        let infoUser = localStorage.getItem('ResultLogin');
        this.userLogData = JSON.parse(infoUser);
        console.log("User -> Profile :" + JSON.stringify(this.userLogData));
        console.log("User -> Profile.intereses:" + JSON.stringify(this.userLogData.intereses));

        if(this.userLogData.intereses.length > 0){
          for(let i=0; i<this.userLogData.intereses.length; i++){
            for(let j=0; j<this.myItems.length; j++){
              if(this.myItems[j].icontype == this.userLogData.intereses[i].img){

                this.myItems[j].status = 1;
                this.myItems[j].colorstack = "border-color: white;";
                this.myItems[j].opacityvalue = "1";

              }
            }
          }
        }

        this.isBusy = false;

    });


}


	public onItemTap(args) {


  	if (this.myItems[args].status == 0)
  	{
   		 this.myItems[args].status=1;
	     this.myItems[args].colorstack="border-color: white;";
	     this.myItems[args].opacityvalue="1";
    }else
    {
	      this.myItems[args].status=0;
	      this.myItems[args].colorstack="border-color: gray;";
	      this.myItems[args].opacityvalue="0.5";
    }

	}

  public goProfile(){

    let intereses: any = [];
    let subIntereses: any = {};

    let selectitem: Typemarker[] = this.myItems.filter(d => d.status === 1);

    if(selectitem.length > 6){

      this.printError("error_interest_atmost");
    
    }else 
    
    if(selectitem.length < 4 ){
    
      this.printError("error_interest_atleast");
    
    }else{
    
      for(var i=0; i<selectitem.length; i++){   
        subIntereses = {};
        subIntereses.id =  selectitem[i]._id       
        subIntereses.img = selectitem[i].icontype;
        subIntereses.width = "10.9";
        subIntereses.height = "18";
        intereses.push(subIntereses);      
      }
      
      this.userLogData.intereses = intereses;

      console.log("userLogData to save final " + JSON.stringify(this.userLogData));

      if(this.menuOption==0)
      {

          this.createAccountUser(this.userLogData.info).then(responseSaveUser => {

            if(responseSaveUser.error!=null){
              this.printError("message_user_save_error");

            }else{
              this.userLogData.info._id=responseSaveUser._id;

              this.saveInterests(intereses, responseSaveUser._id);
              // intereses.forEach(function(element) {
              //   elementUserInterests.userid = responseSaveUser._id
              //   elementUserInterests.typeid = element.id
              //   arrayUserInterests.push(elementUserInterests);
              // });

              // for(var i = 0; i<arrayUserInterests.length; i++){
              //   this.createAccountUserInterests(arrayUserInterests[i]).then(responseSaveUserInterests => {
              //       console.log("save interesrs " + responseSaveUserInterests);
              //   });
              // }

            }

          });

          ;
      }else{

        // proceso para actualizar
        this.deleteUserInterests(this.userLogData.info._id).then(responseDeleteUserInterests => {
          console.log("Records borrados" + responseDeleteUserInterests);
          this.saveInterests(intereses, this.userLogData.info._id);
        });
      }
    }
  }

  goBack(){
    this._routerExtensions.navigate(["user"] );
  }

  goBackProfile(){
       this._routerExtensions.navigate(["profile"]); 
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

  async createAccountUserInterests(bodySave: Usersinterests) {

    console.log("Objeto UserInterests a grabar " + JSON.stringify(bodySave));

      try {
          const userprofileinterests: Usersinterests = await this.usersinterestsService.saveUserInterests(bodySave);
          console.log("Objeto de retorno de create Account Interests" + JSON.stringify(userprofileinterests));
          return userprofileinterests;
      } catch(err) {
          console.log(err);
      }
      
  }    

  async createAccountUser(bodySave: User) {

    console.log("Objeto User a grabar " + JSON.stringify(bodySave));

      try {
          const userprofile: User = await this.userapiService.saveUser(bodySave);
          console.log("Objeto de retorno de create Account " + JSON.stringify(userprofile));
          return userprofile;
      } catch(err) {
          console.log("**** ERRROR " + err);
          
      }
      
  }

  async deleteUserInterests(idUser: string) {

    console.log("DELETE iserid " + idUser);

      try {
          const userprofileinterests: any = await this.usersinterestsService.deleteUsersInterests(idUser);
          return userprofileinterests;
      } catch(err) {
          console.log(err);
      }
      
  }

  async getTypeMarkers() {
      
      console.log("Entro asincrono");
      
      try {
          const typeMarkers: Typemarker[] = await this.typemarkerService.getAllTypes();
          console.log("retorno: "+ JSON.stringify(typeMarkers));
          return typeMarkers;
      } catch(err) {
          console.log(err);
      }
      
  }  

  saveInterests(intereses, indexUser){

    
    let arrayUserInterests = [] as Usersinterests[];

    intereses.forEach(function(element) {
      // elementUserInterests = {};
      let elementUserInterests = {} as Usersinterests;
      elementUserInterests.userid = indexUser
      elementUserInterests.typeid = element.id
      arrayUserInterests.push(elementUserInterests);
    });

    for(var i = 0; i<arrayUserInterests.length; i++){
      this.createAccountUserInterests(arrayUserInterests[i]).then(responseSaveUserInterests => {
          console.log("save interesrs " + responseSaveUserInterests);
      });
    }

    localStorage.removeItem('ResultLogin');
    localstorage.setItem('ResultLogin', JSON.stringify(this.userLogData));
    this.data.storage_vara = null;
    this._routerExtensions.navigate(["profile"]);    

  }

goback(){

  this._routerExtensions.back();    
}  

    onBusyChanged(args) {
        let indicator = <ActivityIndicator>args.object;
        console.log("indicator.busy changed to: " + indicator.busy);
    }

}
