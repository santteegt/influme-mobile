import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'filtermap',
  templateUrl: './filtermap.component.html',
  styleUrls: ['./filtermap.component.css'],
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltermapComponent implements OnInit {
  public myItems: any;
  private colorstack: string;  
  private opacityvalue: string;
  
  constructor(private _routerExtensions: RouterExtensions, private page: Page, private route: ActivatedRoute) { 

    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;

    let extrasfilter = "";

    this.route.queryParams.subscribe(params => {
        extrasfilter = params["FilterInitial"];
    });

    let myItemsAux: any = JSON.parse(extrasfilter); 
  
    this.myItems = [
    {
        "id": "1", "type": "restaurant", "colorstack": "border-color: white;", "opacityvalue": "0.5", "status": 0},
    {
        "id": "2", "type": "bar", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "3", "type": "type3", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "4", "type": "type4", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "5", "type": "gym", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "6", "type": "type6", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "7", "type": "health", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "8", "type": "airport", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "9", "type": "climbing", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "10", "type": "music", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "11", "type": "movies", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "12", "type": "painting", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "13", "type": "games", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "14", "type": "hand", "colorstack": "border-color: white;", "opacityvalue": "0.5",  "status": 0}    
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

      for(var j=0; j<this.myItems.length ;j++){              
          this.myItems[j]["opacityvalue"] = "0.5";
          this.myItems[j]["colorstack"] = "border-color: white;";
          this.myItems[j]["status"] = 0;            
      }

  }

  public sendJSON(){
    let selectitem = this.myItems.filter(d => d.status === 1);

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "DataList": JSON.stringify(selectitem)
          }
    };
    this._routerExtensions.navigate(["viewmap"], navigationExtras)
    //{
    //     clearHistory: true,
    //     animated: true,
    //     transition: {
    //         name: "slideTop",
    //         duration: 350,
    //         curve: "ease"
    //     }
    // });

    console.log(selectitem);
  }

}
