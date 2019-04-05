import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import { Image } from "tns-core-modules/ui/image";
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { ScrollView } from "tns-core-modules/ui/scroll-view";
import { Page } from "tns-core-modules/ui/page";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { ActivatedRoute } from "@angular/router";
import * as _ from 'underscore';
import { RouterExtensions } from "nativescript-angular/router";
import * as localstorage from "nativescript-localstorage";
import { NavigationExtras } from "@angular/router";

@Component({
  selector: 'ns-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrls: ['./hotdeals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  moduleId: module.id,
})


export class HotdealsComponent implements OnInit {

  	// @ViewChild("carruselO") carouselRef: ElementRef;

  	// public newImage: Image;	
  	// public caruselItem: CarouselItem;	

  private jsonuser: any;

	
	myDataArray: Dealsprofile[];
  categoryDeals: any;
  keys: any;  

	constructor(private page: Page, private route: ActivatedRoute,
    private _routerExtensions: RouterExtensions) { 
    this.page.actionBarHidden = true;

    this.route.queryParams.subscribe(params => {
        this.myDataArray = JSON.parse(params["HotDeals"]);
        this.categoryDeals = JSON.parse(params["InterestsDeals"]);   
    });

  }

  ngOnInit() {


  }

  ngAfterViewInit(){



		// this.myDataArray = new Array<any>(
		// 	{"img": "res://icons/filterA", "title": "Filtro A"}, 
		// 	{"img": "res://icons/filterB", "title": "Filtro B"} 
		// );


		// const carousel = this.carouselRef.nativeElement as Carousel;

  //     	this.newImage = new Image();          
  //     	this.newImage.src = "res://icons/filterA";
  //     	this.newImage.stretch = "aspectFill";
  //     	this.newImage.height = 30;
  //     	this.newImage.width = 40;
  //     	this.caruselItem = new CarouselItem(); 
  //     	this.caruselItem.addChild(this.newImage);	
  //     	carousel.addChild(this.caruselItem);

  //     	this.newImage = new Image();          
  //     	this.newImage.src = "res://icons/filterB";
  //     	this.newImage.stretch = "aspectFill";
  //     	this.newImage.height = 30;
  //     	this.newImage.width = 40;      	
  //     	this.caruselItem = new CarouselItem(); 
  //     	this.caruselItem.addChild(this.newImage);	
  //     	carousel.addChild(this.caruselItem);
  }

  getRecordId(obj) {
    return _.keys(obj)[0];
  }

 	// onScrollLoaded(args) {

  //       // scroll to specific position of the horizontal scroll list
  //       let scrollOffset = 330;
  //       (<ScrollView>args.object).scrollToHorizontalOffset(scrollOffset, true);
  //   }


    goviewmap() {
        this._routerExtensions.navigate(["viewmap"]);
    }

    gosearch() {
        this._routerExtensions.navigate(["search"]);
    }

    gologinview() {

        let jsonuseraux = "";
        let jsonDataUser: any;
        jsonuseraux = localstorage.getItem('ResultLogin');

        console.log("[*] Storage Perfil " + jsonuseraux);

        if( jsonuseraux == null)
            this._routerExtensions.navigate(["login"]);
        else{
            this._routerExtensions.navigate(["profile"]);

        }
    }     

    goToDealImage(itemSelected: Dealsprofile){

      let dealMarker: Dealsprofile[] = [];

      dealMarker.push(itemSelected);

      // console.log("[*] MarkerProfile " + JSON.stringify(itemSelected.markerid));
      // console.log("[*] Deal[] " + JSON.stringify(dealMarker));


      let navigationExtras: NavigationExtras = {
          queryParams: {
              "DealMarker": JSON.stringify(dealMarker),
              "MarkerProfile": JSON.stringify(itemSelected.markerid)
            }
      };
      this._routerExtensions.navigate(['dealprofile'], navigationExtras);      

    }   

}
