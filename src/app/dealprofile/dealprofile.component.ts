import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";


@Component({
  selector: 'dealprofile',
  templateUrl: './dealprofile.component.html',
  styleUrls: ['./dealprofile.component.css'],
  moduleId: module.id,
})
export class DealprofileComponent implements OnInit {

  marker_profile: any;

  aux_marker: any;

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute) { 

        let extrastitle = "";

        this.route.queryParams.subscribe(params => {
            extrastitle = params["Titleid"];
        });
        
        this.marker_profile = [
      { 
        "title" : "El Mercado",
        "condiciones": "- Lorem1 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
        "img": "res://mercado/descuentom"
      },
      { 
        "title" : "Art Gym",
        "condiciones": "- Lorem2 Ipsum is simply dummy text of the printing and typesetting industry. &#xA; - Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. &#xA; - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. &#xA; - It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
        "img": "res://mercado/descuentom"
      },
    ];

    this.aux_marker = this.marker_profile.filter(d => d.title === extrastitle)



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
            "Titleid": this.aux_marker[0]["title"]
          }
    };
    this._routerExtensions.navigate(["readqr"], navigationExtras)

  }

  onGoMarkerProfile(){

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "Titleid": this.aux_marker[0]["title"]
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
