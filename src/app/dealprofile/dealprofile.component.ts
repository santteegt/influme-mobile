import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";

import { ImagesService } from "../shared/api/images/images.service";

import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";


@Component({
  selector: 'dealprofile',
  templateUrl: './dealprofile.component.html',
  styleUrls: ['./dealprofile.component.css'],
  moduleId: module.id,
})
export class DealprofileComponent implements OnInit {

  deal_profile: Dealsprofile[];

  aux_marker: Markerprofile;

  imageDeal: ImageSource;

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, 
    private page: Page, private imagesService: ImagesService) { 

    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;    

        let jsonDeal = "";


        this.route.queryParams.subscribe(params => {
            jsonDeal = params["DealMarker"];
            this.aux_marker = JSON.parse(params["MarkerProfile"]);
        });

        this.deal_profile = JSON.parse(jsonDeal);

        console.log("[**] DEALS " + JSON.stringify(this.deal_profile));
        console.log("[**] Marker " + JSON.stringify(this.aux_marker));
        
        this.getImageFilter(this.deal_profile[0].img).then(dataImages=> { 
            this.imageDeal = fromBase64(dataImages.imagesource);
        });   


        // this.imageDeal = "res://" + this.deal_profile[0].img;

        
        // extrastitle = jsonstringparams["dealId"];
        // this.tiutloMarker = jsonstringparams["titulo"];
        
    //     this.marker_profile = [
    //   { 
    //     "iddeal" : "res://mido/CouponMido",
    //     "condiciones": "- Lorem1 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },
    //   { 
    //     "iddeal" : "res://clubberlin/Coupon808",
    //     "condiciones": "- Lorem2 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },
    //   { 
    //     "iddeal" : "res://zola/CouponZola",
    //     "condiciones": "- Lorem3 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },
    //   { 
    //     "iddeal" : "res://sonsofmana/CouponSOM",
    //     "condiciones": "- Lorem4 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },
    //   { 
    //     "iddeal" : "res://tausend/CouponTausend",
    //     "condiciones": "- Lorem5 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },
    //   { 
    //     "iddeal" : "res://asb/CouponSealife",
    //     "condiciones": "- Lorem6 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },
    //   { 
    //     "iddeal" : "res://berliner/CouponBerliner",
    //     "condiciones": "- Lorem7 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    //   },                              
    // ];

    // this.aux_marker = this.marker_profile.filter(d => d.iddeal === extrastitle)



  }

  ngOnInit() {
  }

  onRedeemDeal(){

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "DealMarker": JSON.stringify(this.deal_profile),
            "MarkerProfile": JSON.stringify(this.aux_marker),
          }
    };
    this._routerExtensions.navigate(["readqr"], navigationExtras)

  }

  onGoMarkerProfile(){

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "MarkerProfile": JSON.stringify(this.aux_marker)
          }
    };
    // this._routerExtensions.navigate(["markerprofile"], navigationExtras)
    this._routerExtensions.back();
  
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

  async getImageFilter(idImage) {
    try {
      // console.log("Name Img " + idImage);
      const dealsRaw: any = await this.imagesService.getImagesFiles(idImage);
      // console.log("IMG "+JSON.stringify(dealsRaw));
      return dealsRaw;
        } catch(err) {
      console.log(err);
        }
        
  }

}
