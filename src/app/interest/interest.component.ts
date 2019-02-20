import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import * as localstorage from "nativescript-localstorage";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css'],
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestComponent implements OnInit {
	
  public myItems: any;
  public UserLogData: any;

  constructor(private page: Page, private _routerExtensions: RouterExtensions) { 
    
    this.page.actionBarHidden = true;

    let infoUser = localStorage.getItem('ResultLogin');

    this.UserLogData = JSON.parse(infoUser);

    this.myItems = [
    {
        "id": "1", "type": "restaurant", "colorstack": "border-color: gray;", "opacityvalue": "0.5", "status": 0},
    {
        "id": "2", "type": "bar", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "3", "type": "type3", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "4", "type": "type4", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "5", "type": "gym", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "6", "type": "type6", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "7", "type": "health", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "8", "type": "airport", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "9", "type": "climbing", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "10", "type": "music", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "11", "type": "movies", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "12", "type": "painting", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "13", "type": "games", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "14", "type": "hand", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0}    
    ];
}

  ngOnInit() {
  }

	public onItemTap(args) {
  	if (this.myItems[args]["status"] == 0)
  	{
   		 this.myItems[args]["status"]=1;
	     this.myItems[args]["colorstack"]="border-color: white;";
	     this.myItems[args]["opacityvalue"]="1";
    }else
    {
	      this.myItems[args]["status"]=0;
	      this.myItems[args]["colorstack"]="border-color: gray;";
	      this.myItems[args]["opacityvalue"]="0.5";
    }
	}

  public goProfile(){

    let intereses = [];

    let selectitem = this.myItems.filter(d => d.status === 1);

    for(var i=0; i<selectitem.length; i++){
      intereses.push(selectitem[i]["type"]);      
    }
    
    this.UserLogData["intereses"] = intereses;

    localStorage.removeItem('ResultLogin');

    localstorage.setItem('ResultLogin', JSON.stringify(this.UserLogData));

    this._routerExtensions.navigate(["profile"]);
  }

}
