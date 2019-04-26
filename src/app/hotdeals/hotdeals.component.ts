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
import * as nsPlatform from "nativescript-platform";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Data } from "../providers/data/data";

import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { Usersdeals } from "../shared/models/usersdeals.model";


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

  @ViewChild("maintitle") stackMainTitle: ElementRef;
  titleNativeStack: GridLayout;    

  private jsonuser: any;
  userIdentification: string;

	
	myDataArray: Dealsprofile[];
  categoryDeals: any;
  keys: any;  

	constructor(private page: Page, private route: ActivatedRoute,
    private _routerExtensions: RouterExtensions, private data: Data, 
    private usersdealsService: UsersdealsService) { 
    this.page.actionBarHidden = true;

    // this.route.queryParams.subscribe(params => {
    //     this.myDataArray = JSON.parse(params["HotDeals"]);
    //     this.categoryDeals = JSON.parse(params["InterestsDeals"]);   
    // });

    this.myDataArray = this.data.storage_varb;
    this.categoryDeals = this.data.storage_vara;


    if(localstorage.getItem('ResultLogin') != null){
        let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
        this.userIdentification = userLoginRecord.info._id;
    }

  }

  ngOnInit() {

    this.titleNativeStack = this.stackMainTitle.nativeElement;


    if (nsPlatform.device.model.includes("11")){

        this.titleNativeStack.paddingTop = 93;
        
    }else{
        this.titleNativeStack.paddingTop = 49;
        
    }    


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
        this._routerExtensions.navigate(["viewmap"], {animated: false});
    }

    gosearch() {
        this._routerExtensions.navigate(["search"], {animated: false});
    }

    // gologinview() {

    //     let jsonuseraux = "";
    //     let jsonDataUser: any;
    //     jsonuseraux = localstorage.getItem('ResultLogin');

    //     console.log("[*] Storage Perfil " + jsonuseraux);

    //     if( jsonuseraux == null)
    //         this._routerExtensions.navigate(["login"]);
    //     else{
    //         this._routerExtensions.navigate(["profile"]);

    //     }
    // }     

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

  async getDealsSubscribe(userId: string) {

      try {
          const users_deals: any = await this.usersdealsService.getAllDealsSubscribe(userId);
          console.log("******* " + JSON.stringify(users_deals));
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return users_deals;
      } catch(err) {
          console.log(err);
      }
      
  }

}
