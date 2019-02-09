import { AfterViewInit, Component, OnInit, ElementRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
// import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { isAndroid } from 'tns-core-modules/platform';
import { alert } from 'tns-core-modules/ui/dialogs';
// import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { Page } from "tns-core-modules/ui/page";
import * as localstorage from "nativescript-localstorage";

// registerElement('Carousel', () => Carousel);
// registerElement('CarouselItem', () => CarouselItem);

@Component({
  selector: 'markerprofile',
  templateUrl: './markerprofile.component.html',
  styleUrls: ['./markerprofile.component.css'],
  moduleId: module.id,
})
export class MarkerprofileComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carouselRef: ElementRef;

    // Para coger un StackLayout y agregar elementos
  @ViewChild("myNgStack") stackRef: ElementRef;
  myNativeStack: StackLayout;

  public newImage: Image;
  
  marker_profile: any;

  profile_id_selected: any;

  images_descuentos: any;

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page) {

    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;  

    let titleSearch = ""; 

    this.marker_profile = [
      { 
        "title" : "Mido",
        "descripcion": "Best quality sushi & vietnamese cuisine since 1999",
        "web": "www.mido.berlin",
        "seguidores": "120",
        "img1": "res://mido/1",
        "img2": "res://mido/2",
        "img3": "res://mido/3",        
        "promos": [
          {
            "img": "res://mido/CouponMido", "function": "onClickImga()"
          }
          // ,
          // {
          //   "img": "res://mercado/descuentoa", "function": "onClickImgb()"
          // }
        ]
      },
      { 
        "title" : "808 Club Berlin",
        "descripcion": "Friday & Saturday from 11pm, HEARTBREAK every Friday",
        "web": "www.808.berlin",
        "seguidores": "200",
        "img1": "res://808/1",
        "img2": "res://808/2",
        "img3": "res://808/3",
        "promos": [
          {
            "img": "res://808/Coupon808", "function": "onClickImga()"
          }
        ]
      },
      { 
        "title" : "Zola",
        "descripcion": "Neapolitan wood-fired pizza",
        "web": "www.zola.com",
        "seguidores": "240",
        "img1": "res://zola/1",
        "img2": "res://zola/2",
        "img3": "res://zola/3",        
        "promos": [
          {
            "img": "res://zola/CouponZola", "function": "onClickImga()"
          }
        ]
      },
      { 
        "title" : "Sons of Mana",
        "descripcion": "Hawaiian Poké & Avocado Bowls",
        "web": "www.sonsofmana.de",
        "seguidores": "540",
        "img1": "res://sonsofmana/1",
        "img2": "res://sonsofmana/2",
        "img3": "res://sonsofmana/3",        
        "promos": [
          {
            "img": "res://sonsofmana/CouponSOM", "function": "onClickImga()"
          }
        ]
      },
      { 
        "title" : "Bar Tausend",
        "descripcion": "Subtly lit bar with an easygoing dress code, live music shows plus Asian & Ibero-American cuisine",
        "web": "www.tausendberlin.com",
        "seguidores": "290",
        "img1": "res://tausend/1",
        "img2": "res://tausend/2",
        "img3": "res://tausend/3",                
        "promos": [
          {
            "img": "res://tausend/CouponTausend", "function": "onClickImga()"
          }
        ]
      },
      { 
        "title" : "Aquadom & Sealife Berlin",
        "descripcion": "Family-friendly exhibits with a variety of sea creatures (most offer play areas & group packages)",
        "web": "www.visitsealife.com",
        "seguidores": "390",
        "img1": "res://asb/1",
        "img2": "res://asb/2",
        "img3": "res://asb/3",                        
        "promos": [
          {
            "img": "res://asb/CouponSealife", "function": "onClickImga()"
          }
        ]
      },
      { 
        "title" : "Berliner Fernsehturm",
        "descripcion": "368m-tall tower, opened in 1969, with a viewing gallery at 203m and revolving restaurant at 207m",
        "web": "www.tv-turm.de",
        "seguidores": "790",
        "img1": "res://berliner/1",
        "img2": "res://berliner/2",
        "img3": "res://berliner/3",
        "promos": [
          {
            "img": "res://berliner/CouponBerliner", "function": "onClickImga()"
          }
        ]
      }      
    ];

    this.route.queryParams.subscribe(params => {
        titleSearch = params["Titleid"];
    });

    this.profile_id_selected = this.marker_profile.filter(d => d.title === titleSearch);

  }

  ngOnInit() {


  }

  ngAfterViewInit() {
       // const carousel = this.carouselRef.nativeElement as Carousel;
        // // if (isAndroid) {
        // //   setTimeout(() => {
        // //     carousel.indicatorAnimation = IndicatorAnimation.WORM;
        // //     alert({
        // //       message: 'The indicator animation has changed from SWAP to WORM. View the items.component.ts to see how.',
        // //       okButtonText: 'Okay'
        // //     });
        // //   }, 5000);
        // }

    // this.images_descuentos = this.profile_id_selected[0]["promos"];

    // this.myNativeStack = this.stackRef.nativeElement;

    // for (var i=0; i<this.images_descuentos.length; i++){
    //   let valueimage = this.images_descuentos[i]["img"];
    //   this.newImage = new Image();
    //   this.newImage.src = valueimage
    //   this.newImage.stretch = "fill";
    //   this.newImage.on(GestureTypes.tap, function (args: GestureEventData) {
    
    //       console.log(args.ios)          
    //   });
    //   this.myNativeStack.addChild(this.newImage);
    //   }
  }


  onClickImga(){

    let jsonNextPage = {};

    console.log("[*] Image Deal "+ this.profile_id_selected[0]["promos"][0]["img"])

    jsonNextPage = {
      "titulo": this.profile_id_selected[0]["title"], 
      "dealId": this.profile_id_selected[0]["promos"][0]["img"]
    }    



    let navigationExtras: NavigationExtras = {
        queryParams: {
            "infoDealMarker": JSON.stringify(jsonNextPage)
          }
    };

    this._routerExtensions.navigate(["dealprofile"], navigationExtras) 
  }

  onClickImgb(){
    alert("Press1")
}

  onClickFollow(){
    alert("Follow")
}

  goviewmap() {

      let empty_value = []
      let navigationExtras: NavigationExtras = {
          queryParams: {
              "DataList": JSON.stringify(empty_value)
        }
      };
      
      this._routerExtensions.navigate(["viewmap"], navigationExtras );

  }

      gologinview() {

        let jsonuseraux = "";
        let jsonDataUser: any;
        jsonuseraux = localstorage.getItem('ResultLogin');

        console.log("[*] Storage Perfil " + jsonuseraux);

        if( jsonuseraux == null)
            this._routerExtensions.navigate(["login"]);
        else{
            let auxdata = JSON.parse(jsonuseraux);
            jsonDataUser = {
                "nameU": auxdata["profile"]["name"],
                "cityU": "Cuenca, Ecuador",
                "imageU": auxdata["profile"]["picture"]
            };
            let navigationExtras: NavigationExtras = {
            queryParams: {
                  "info": JSON.stringify(jsonDataUser)
                }
            };
            this._routerExtensions.navigate(["profile"], navigationExtras);
        }
    }


}
