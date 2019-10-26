import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import * as localstorage from "nativescript-localstorage";
import * as nsPlatform from "nativescript-platform";
import { ViewChild, ElementRef } from "@angular/core";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";

@Component({
  selector: 'filtermap',
  templateUrl: './filtermap.component.html',
  styleUrls: ['./filtermap.component.css'],
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltermapComponent implements OnInit {


  @ViewChild("maintitle", {static: false}) stackMainTitle: ElementRef;
  titleNativeStack: GridLayout;

  public myItems: any;
  private colorstack: string;  
  private opacityvalue: string;
  
  constructor(private _routerExtensions: RouterExtensions, private page: Page, private route: ActivatedRoute) { 

    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;

    let extrasfilter = "";

    // **** NEW ********** 
    // this.route.queryParams.subscribe(params => {
    //     extrasfilter = params["FilterInitial"];
    // });

    // let myItemsAux: any = JSON.parse(extrasfilter);
    
    let myItemsAux: any;

    if(localstorage.getItem('Options_Filter') != null){
        extrasfilter = localstorage.getItem('Options_Filter');
        myItemsAux = JSON.parse(extrasfilter);
    } else
    {
         myItemsAux = []; 
    }

    //******************
  
    this.myItems = [
    {
        "id": "1", "type": "Foodie", "colorstack": "border-color: white;", "opacityvalue": "0.5", "status": 0},
    {
        "id": "2", "type": "Night Fun", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "3", "type": "Tech", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "4", "type": "Fashion", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "5", "type": "Sports", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "6", "type": "Beauty", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "7", "type": "Health", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "8", "type": "Travel", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "9", "type": "Adventure", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "10", "type": "Music", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "11", "type": "Film", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "12", "type": "Art", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "13", "type": "Gaming", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "14", "type": "Causes", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0}    
    ];      

    if(myItemsAux.length > 0){
      
      for(let i=0; i<myItemsAux.length; i++){
            for(let j=0; j<this.myItems.length; j++){      
              if(this.myItems[j]["id"] == myItemsAux[i]["id"])
              {
                this.myItems[j]["opacityvalue"] = "1";
                this.myItems[j]["colorstack"] = "border-color: red;";
                this.myItems[j]["status"] = 1;        
                break;    
              }
            }        
      }
    }


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
    
  }

  public onItemTap(args) {
    if (this.myItems[args]["status"] == 0)
    {
     this.myItems[args]["status"]=1;
     this.myItems[args]["colorstack"]="border-color: red;";
     this.myItems[args]["opacityvalue"]="1";
    }else
    {
      this.myItems[args]["status"]=0;
      this.myItems[args]["colorstack"]="border-color: white;";
      this.myItems[args]["opacityvalue"]="0.5";
    }
  }

  public clearFilter(){

      this.cleanLocalStorage();

      for(var j=0; j<this.myItems.length ;j++){              
          this.myItems[j]["opacityvalue"] = "0.5";
          this.myItems[j]["colorstack"] = "border-color: white;";
          this.myItems[j]["status"] = 0;            
      }

  }

  public sendJSON(){
    let selectitem = this.myItems.filter(d => d.status === 1);

    // *** New *******
    
    this.cleanLocalStorage();


    console.log("[*] DEBUG: Storage Filter: "+ selectitem);
    localstorage.setItem('Options_Filter', JSON.stringify(selectitem));

    // let navigationExtras: NavigationExtras = {
    //     queryParams: {
    //         "DataList": JSON.stringify(selectitem)
    //       }
    // };

    // this._routerExtensions.navigate(["viewmap"], navigationExtras)
    this._routerExtensions.navigate(["viewmap"]);

    // *************

    //{
    //     clearHistory: true,
    //     animated: true,
    //     transition: {
    //         name: "slideTop",
    //         duration: 350,
    //         curve: "ease"
    //     }
    // });

  }

  public cleanLocalStorage(){

    if (localStorage.getItem('Options_Filter') != null){
        console.log("[*] DEBUG: Storage Remove");
        localStorage.removeItem('Options_Filter');
    }
  }

}
