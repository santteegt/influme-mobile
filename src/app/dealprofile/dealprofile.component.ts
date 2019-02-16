import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";


@Component({
  selector: 'dealprofile',
  templateUrl: './dealprofile.component.html',
  styleUrls: ['./dealprofile.component.css'],
  moduleId: module.id,
})
export class DealprofileComponent implements OnInit {

  marker_profile: any;

  aux_marker: any;

  tiutloMarker: string;

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page) { 

    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;    
        let jsonstringparams = [];
        let navigateParametros = "";
        let extrastitle = "";

        this.route.queryParams.subscribe(params => {
            navigateParametros = params["infoDealMarker"];
        });

        jsonstringparams = JSON.parse(navigateParametros);
        extrastitle = jsonstringparams["dealId"];
        this.tiutloMarker = jsonstringparams["titulo"];
        
        this.marker_profile = [
      { 
        "iddeal" : "res://mido/CouponMido",
        "condiciones": "- Lorem1 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },
      { 
        "iddeal" : "res://clubberlin/Coupon808",
        "condiciones": "- Lorem2 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },
      { 
        "iddeal" : "res://zola/CouponZola",
        "condiciones": "- Lorem3 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },
      { 
        "iddeal" : "res://sonsofmana/CouponSOM",
        "condiciones": "- Lorem4 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },
      { 
        "iddeal" : "res://tausend/CouponTausend",
        "condiciones": "- Lorem5 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },
      { 
        "iddeal" : "res://asb/CouponSealife",
        "condiciones": "- Lorem6 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },
      { 
        "iddeal" : "res://berliner/CouponBerliner",
        "condiciones": "- Lorem7 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
      },                              
    ];

    this.aux_marker = this.marker_profile.filter(d => d.iddeal === extrastitle)



  }

  ngOnInit() {
  }

  onRedeemDeal(){
   //    this._routerExtensions.navigate(["readqr"], {
   //    clearHistory: true,
   //    animated: true,
   //    transition: {
   //        name: "slideTop",
   //        duration: 350,
   //        curve: "ease"
   //    }
   // });

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "Titleid": this.tiutloMarker
          }
    };
    this._routerExtensions.navigate(["readqr"], navigationExtras)

  }

  onGoMarkerProfile(){

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "Titleid": this.tiutloMarker
          }
    };
    this._routerExtensions.navigate(["markerprofile"], navigationExtras)
  
  //     this._routerExtensions.navigate(["markerprofile"], {
  //     clearHistory: true,
  //     animated: true,
  //     transition: {
  //         name: "slideRight",
  //         duration: 350,
  //         curve: "ease"
  //     }
  // });
 }
}
