import { AfterViewInit, Component, OnInit, ElementRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Carousel, IndicatorAnimation, CarouselItem } from 'nativescript-carousel';
import { isAndroid } from 'tns-core-modules/platform';
import { alert } from 'tns-core-modules/ui/dialogs';
import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Image } from "tns-core-modules/ui/image";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";

registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

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

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute) {

    let titleSearch = ""; 

    this.marker_profile = [
      { 
        "title" : "El Mercado",
        "descripcion": "Comida tradicional",
        "web": "www.mercadito.cu",
        "seguidores": "120",
        "promos": [
          {
            "img": "res://mercado/descuentom", "function": "onClickImga()"
          },
          {
            "img": "res://mercado/descuentoa", "function": "onClickImgb()"
          }
        ]
      },
      { 
        "title" : "Art Gym",
        "descripcion": "Gimnasio",
        "web": "www.gymart.cu",
        "seguidores": "60",
        "promos": [
          {
            "img": "res://gim/descuentoa", "function": "onClickImga()"
          },
          {
            "img": "res://gim/descuentob", "function": "onClickImgb()"
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

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "Titleid": this.profile_id_selected[0]["title"]
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


}
