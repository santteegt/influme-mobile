import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";

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
  
  constructor(private _routerExtensions: RouterExtensions) { 
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
    ]
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
