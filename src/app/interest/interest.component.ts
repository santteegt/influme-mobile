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
        "id": "1", "img":"res://icons/filterA", "pw":"10.9", "ph":"18", "type": "restaurant", "colorstack": "border-color: gray;", "opacityvalue": "0.5", "status": 0},
    {
        "id": "2", "img":"res://icons/filterB", "pw":"10.9", "ph":"18", "type": "bar", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "3", "img":"res://icons/filterC", "pw":"9.6", "ph":"18", "type": "type3", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "4", "img":"res://icons/filterD", "pw":"15.1", "ph":"14.3", "type": "type4", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "5", "img":"res://icons/filterE", "pw":"19.2", "ph":"9", "type": "gym", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "6", "img":"res://icons/filterF", "pw":"10.9", "ph":"18", "type": "type6", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "7", "img":"res://icons/filterG", "pw":"10.9", "ph":"18", "type": "health", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "8", "img":"res://icons/filterH", "pw":"10.9", "ph":"18", "type": "airport", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "9", "img":"res://icons/filterI", "pw":"10.9", "ph":"18", "type": "climbing", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "10", "img":"res://icons/filterJ", "pw":"10.9", "ph":"18", "type": "music", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "11", "img":"res://icons/filterK", "pw":"10.9", "ph":"18", "type": "movies", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "12", "img":"res://icons/filterM", "pw":"10.9", "ph":"18", "type": "painting", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "13", "img":"res://icons/filterN", "pw":"10.9", "ph":"18", "type": "games", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0},
    {
        "id": "14", "img":"res://icons/filterO", "pw":"10.9", "ph":"18", "type": "hand", "colorstack": "border-color: gray;", "opacityvalue": "0.5",  "status": 0}    
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
    let subIntereses = {};

    let selectitem = this.myItems.filter(d => d.status === 1);

    for(var i=0; i<selectitem.length; i++){   
      subIntereses = {};
      subIntereses["img"] = selectitem[i]["img"];
      subIntereses["width"] = selectitem[i]["pw"];
      subIntereses["height"] = selectitem[i]["ph"];
      intereses.push(subIntereses);      
    }
    
    this.UserLogData["intereses"] = intereses;

    localStorage.removeItem('ResultLogin');

    localstorage.setItem('ResultLogin', JSON.stringify(this.UserLogData));

    this._routerExtensions.navigate(["profile"]);
  }

  goBack(){
    this._routerExtensions.navigate(["user"] );
  }

}
