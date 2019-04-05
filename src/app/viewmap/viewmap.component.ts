import { Component, OnInit } from '@angular/core';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { ViewChild, ElementRef } from "@angular/core";
// >> import-image-module
import { Image } from "tns-core-modules/ui/image";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Page } from "tns-core-modules/ui/page";
import * as localstorage from "nativescript-localstorage";

// import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";
import { Dealsprofile } from "../shared/models/dealsprofile.model";

import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";

import { UsersinterestsService } from "../shared/api/usersinterests/usersinterests.service";
import { Usersinterests } from "../shared/models/usersinterests.model";

import { localize } from "nativescript-localize";



// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: 'viewmap',
  templateUrl: './viewmap.component.html',
  styleUrls: ['./viewmap.component.css'],
  moduleId: module.id,
})
export class ViewmapComponent {

    private jsonuser: any;
    private prefixImagePath = "res://";
    userIdentification: string = "5c96f09a6d69fdd962e49c19";

    // Para coger un StackLayout y agregar elementos
    @ViewChild("myNgStack") stackRef: ElementRef;
    myNativeStack: StackLayout;

    // @ViewChild("myNgStack1") stackRef1: ElementRef;
    @ViewChild("myNgStack1") stackRef1: ElementRef;
    myNativeStack1: StackLayout;

    // >> creating-image-code
    public newImage: Image;

    // Variable para controlar la visibilidad de StackLayout de Home Profile
    showDetails= "collapsed";
    
    // Titulo, Desripcion e imagen de el marcador seleccionado
    title_marker_selected: string;
    des_marker_selected: string;
 
    latitude = 52.531361;
    longitude = 13.375285;
    zoom = 12;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    lastCamera: String;

    // JSON con datos de los locales
    // dealsprofilecontent: Dealsprofile;
    // dealsprofilecontent = {} as Dealsprofile;
    marker_profile: Dealsprofile[];
    markerSelectOnMap:  Dealsprofile[] = [];
    // marker_profile: Dealsprofile = [];
    // marker_profile: Dealsprofile;
    // Variable JSON que contiene los parametros de busqueda
    optionsFilter: any;

    messagefreebutton: string;


    constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page,
        private dealsprofileService: DealsprofileService, private usersinterestsService: UsersinterestsService,
        private markerprofileService: MarkerprofileService) {
    
        this.page.actionBarHidden = true;

        // this.page.backgroundSpanUnderStatusBar = true;

        // if(jsonuseraux != null){
        //     this.jsonuser = JSON.parse(jsonuseraux);
        // }

        this.optionsFilter = [];
        let extrasfilter = "";

        if(localstorage.getItem('Options_Filter') != null){
            extrasfilter = localstorage.getItem('Options_Filter');
            this.optionsFilter = JSON.parse(extrasfilter);
        }


        // this.availableMarkers();
        // console.log("[*] Marker " + JSON.stringify(this.marker_profile));

        // this.marker_profile = [
        //         { 
        //           "title" : "Mido",
        //           "snippet" : "Sushi Restaurant",
        //           "tipo": "restaurant", 
        //           "lat": "52.501346",
        //           "lon": "13.307921",
        //           "picturehome": "res://mido/1",
        //           "icontype": "res://icons/filterA"
        //         },
        //         {
        //             "title": "808 Club Berlin",
        //             "snippet" : "Night Club",
        //             "tipo": "health",
        //             "lat": "52.505766",
        //             "lon": "13.338038",
        //             "picturehome": "res://clubberlin/1",
        //             "icontype": "res://icons/filterG"
        //         },
        //         {
        //             "title": "Zola",
        //             "snippet" : "Pizza Restaurant",
        //             "tipo": "restaurant",
        //             "lat": "52.496335",
        //             "lon": "13.422261",
        //             "picturehome": "res://zola/1",
        //             "icontype": "res://icons/filterA"
        //         },
        //         {
        //             "title": "Sons of Mana",
        //             "snippet" : "Hawaiian Cuisine",
        //             "tipo": "restaurant",
        //             "lat": "52.527582",
        //             "lon": "13.408219",
        //             "picturehome": "res://sonsofmana/1",
        //             "icontype": "res://icons/filterA"
        //         },
        //         {
        //             "title": "Bar Tausend",
        //             "snippet" : "Cocktails-Music-Dining",
        //             "tipo": "bar",
        //             "lat": "52.521061",
        //             "lon": "13.384872",
        //             "picturehome": "res://tausend/2",
        //             "icontype": "res://icons/filterB"
        //         },
        //         {
        //             "title": "Aquadom & Sealife Berlin",
        //             "snippet" : "Aquarium",
        //             "tipo": "hand",
        //             "lat": "52.520339",
        //             "lon": "13.403782",
        //             "picturehome": "res://asb/1",
        //             "icontype": "res://icons/filterO"
        //         },
        //         {
        //             "title": "Berliner Fernsehturm",
        //             "snippet" : "Television Tower",
        //             "tipo": "painting",
        //             "lat": "52.521030",
        //             "lon": "13.409430",
        //             "picturehome": "res://berliner/5",
        //             "icontype": "res://icons/filterM"
        //         }                
        //         ]
    }

    ngOnInit() {
        this.myNativeStack = this.stackRef.nativeElement;
        this.myNativeStack1 = this.stackRef1.nativeElement;
        // this.dealsprofilecontent = [];
    }

    //Map events
    onMapReady(event) {
        
        console.log('Map Ready');

        this.availableMarkers().then(dataM => {

            // this.dealsprofilecontent = dataM;
            // console.log("[*] Marker final " + this.dealsprofilecontent.);        

            this.marker_profile = dataM;

            // var gMap = event.gMap;
            // console.log(gMap);
            // gMap.myLocationEnabled(true);

            this.mapView = event.object;
            this.mapView.myLocationEnabled = true;
            this.mapView.settings.myLocationButtonEnabled = true;

            // this.mapView.myLocationEnabled(true);

            console.log("Setting a marker...");

            if(this.optionsFilter.length > 0){

                for(var j = 0; j < this.optionsFilter.length; j++){
                    var onlyMarker: Dealsprofile[];
                    onlyMarker = this.marker_profile.filter(d => d.markerid.type.description == this.optionsFilter[j]["type"]);

                    for ( var i = 0; i < onlyMarker.length; i++) {

                        var marker =  new Marker();
                        marker.position = Position.positionFromLatLng(onlyMarker[i].markerid.lat, onlyMarker[i].markerid.lon);
                        marker.title = onlyMarker[i].markerid.title;
                        marker.snippet = onlyMarker[i].markerid.shortdescription;
                        marker.userData = {index: 1};
                        this.mapView.addMarker(marker);
                    }            
                }
            }else
            {
                for ( var i = 0; i < this.marker_profile.length; i++) {
                    var marker = new Marker();
                    marker.position = Position.positionFromLatLng(this.marker_profile[i].markerid.lat, this.marker_profile[i].markerid.lon);
                    marker.title = this.marker_profile[i].markerid.title;
                    marker.snippet = this.marker_profile[i].markerid.shortdescription;
                    marker.userData = {index: 1};
                    this.mapView.addMarker(marker);
                }
            }
        });
    }


    onCoordinateTapped(args) {
        // console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
        this.showDetails= "collapsed"
    }

    onMarkerEvent(args) {

        this.markerSelectOnMap = [];

        let ticketsfree: number = 0;

        this.title_marker_selected = args.marker.title;
        this.des_marker_selected = args.marker.snippet;
        
        this.markerSelectOnMap = this.marker_profile.filter(d => d.markerid.title == args.marker.title);

        let img_marker_selected = this.prefixImagePath + this.markerSelectOnMap[0].markerid.picturehome;
        let icon_type = this.prefixImagePath + this.markerSelectOnMap[0].markerid.type.icontype;
        for(var i=0; i<this.markerSelectOnMap.length; i++){
            ticketsfree = ticketsfree + (this.markerSelectOnMap[i].total_tickets - this.markerSelectOnMap[i].used_tickets);
            this.messagefreebutton = ticketsfree + " " + localize("available_deal");
        }
        


        //console.log("Icono " + icon_type);
        
        this.myNativeStack.removeChildren();
        this.newImage = new Image();
        this.newImage.src = img_marker_selected;
        this.newImage.stretch = "aspectFill";
        this.myNativeStack.addChild(this.newImage);

        this.myNativeStack1.removeChildren();
        this.newImage = new Image();
        this.newImage.src = icon_type;
        this.newImage.stretch = "aspectFit";
        this.newImage.width = 11.7;
        this.newImage.height = 19.4;
        // this.newImage.style.color = "black";
        this.myNativeStack1.addChild(this.newImage);

        // this.description_marker = args.marker.snippet;
        // alert("Marker Event: '" + args.eventName + "' triggered on: " + args.marker.title + ", Lat: " + args.marker.position.latitude 
        //     + ", Lon: " + args.marker.position.longitude)
        this.showDetails= "visible"
    }

    onCameraChanged(args) {
        // console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        // this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        // console.log("Camera moving: " + JSON.stringify(args.camera));
    }

    gofilter() {

        // **** new ****
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "FilterInitial": JSON.stringify(this.optionsFilter)
        //       }
        // };

        // this._routerExtensions.navigate(["filtermap"], navigationExtras)
        this._routerExtensions.navigate(["filtermap"]);

        // ********************
        // {
        //     clearHistory: true,
        //     animated: true,
        //     transition: {
        //         name: "slideTop",
        //         duration: 350,
        //         curve: "ease"
        //     }
        // });
    }

    gomarkerprofile() {

    let navigationExtras: NavigationExtras = {
        queryParams: {
            "MarkerProfile": JSON.stringify(this.markerSelectOnMap[0].markerid)
          }
    };
    this._routerExtensions.navigate(["markerprofile"], navigationExtras);
    

    }

    goviewmap() {
        // **** New 

        // let empty_value = []
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "DataList": JSON.stringify(empty_value)
        //   }
        // };
        
        // this._routerExtensions.navigate(["viewmap"], navigationExtras );

        this._routerExtensions.navigate(["viewmap"]);

        // *** 
    }

    gosearch() {
        // **** New 

        // let empty_value = []
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "DataList": JSON.stringify(empty_value)
        //   }
        // };
        
        // this._routerExtensions.navigate(["viewmap"], navigationExtras );

        this._routerExtensions.navigate(["search"]);

        // *** 
    }    

    goHotDeals() {

        let myDataArray: Dealsprofile[];
        let typesUserArray: any;
        let markerIdentificators = [];
        let myDeals: Dealsprofile[];
        var strTypesUserArray = "";
        var strMarkersId = "";
        let arrayGroupBy: any = [];


        this.getCurrentHotDeals().then(dataResponse => {

            myDataArray = dataResponse;

            this.getTypesMarkerByUsers(this.userIdentification).then(typeResponse => {      

                typesUserArray = typeResponse.map(function(typeRes) {
                  return typeRes.typeid;
                });                

                strTypesUserArray = typesUserArray.join(","); 

                this.getMarkerByType(strTypesUserArray).then(markersResponse => {      
                    markerIdentificators = markersResponse.map(function(markerRes) {
                      return markerRes._id;
                    });

                    strMarkersId = markerIdentificators.join(","); 

                    this.getUsersInterestsDeals(strMarkersId).then(dealsResponse => {      
                        myDeals = dealsResponse;
                        let alltypes = [];

                        alltypes = myDeals.map(function(typeList) {
                          return typeList.markerid.type.description;;
                        });     
                        alltypes = alltypes.filter(function(elem, index, self) {
                          return index === self.indexOf(elem);
                        })
                        
                        let myDealsAgroup: Dealsprofile[];
                        
                        
                        for(let i=0; i<alltypes.length; i++){
                            let elementArray = {};
                            myDealsAgroup = myDeals.filter(itmeType => itmeType.markerid.type.description === alltypes[i]);
                            elementArray[alltypes[i]] = myDealsAgroup;
                            arrayGroupBy.push(elementArray);
                                
                        }

                        let navigationExtras: NavigationExtras = {
                            queryParams: {
                                "InterestsDeals": JSON.stringify(arrayGroupBy),
                                "HotDeals": JSON.stringify(myDataArray)
                            }
                        };

                        this._routerExtensions.navigate(["hotdeals"], navigationExtras);                        

                    });
                    
                });

            });

        });    



    }


    gologinview() {

        let jsonuseraux = "";
        let jsonDataUser: any;
        jsonuseraux = localstorage.getItem('ResultLogin');

        console.log("[*] Storage Perfil " + jsonuseraux);

        if( jsonuseraux == null)
            this._routerExtensions.navigate(["login"]);
        else{
            // let auxdata = JSON.parse(jsonuseraux);
            // jsonDataUser = {
            //     "nameU": auxdata["profile"]["name"],
            //     "cityU": "Cuenca, Ecuador",
            //     "imageU": auxdata["profile"]["picture"]
            // };
            // let navigationExtras: NavigationExtras = {
            // queryParams: {
            //       "info": JSON.stringify(jsonDataUser)
            //     }
            // };
            // this._routerExtensions.navigate(["profile"], navigationExtras);
            this._routerExtensions.navigate(["profile"]);

        }
    }
    async availableMarkers() {

        try {
            // const marker_ids: Dealsprofile = await this.dealsprofileService.getMarkerWithDealsAvailable();
            const dealsprofilecontent: Dealsprofile[] = await this.dealsprofileService.getMarkerWithDealsAvailable();
            // typeof(marker_ids);
            // console.log("[*] DEBUG " + typeof(marker_ids));
            // this.dealsprofilecontent = <Dealsprofile> marker_ids; 
            // dealsprofilecontent = marker_ids
            // this.dealsprofilecontent = marker_ids;
            // console.log("{*} Deals Content" + this.dealsprofilecontent.conditions);
            // var dealsprofilecontent: any = JSON.parse(marker_ids); 
            // var dealsprofilecontent: any = dealsprofilecontent = JSON.parse(marker_ids); 
            // let dealsprofilecontent: any = dealsprofilecontent = JSON.parse(marker_ids);            
            // for(var i=0; i< dealsprofilecontent.length; i++){
            //     const marker_profile_string = await this.markerprofileService.getMarkerprofile(dealsprofilecontent[i]["markerid"]);
            //     let individualMarkerprofile = JSON.parse(marker_profile_string);
            //     marker_profile_intern.push(individualMarkerprofile);
            //     // console.log("[*] Marker AUX" + JSON.stringify(this.marker_profile));     
            // }
            return dealsprofilecontent;
        } catch(err) {
            console.log(err);
        }

        // this.dealsprofileService.getMarkerWithDealsAvailable().then((data) => {
        //     this.dealsprofilecontent = JSON.parse(data);
        //     for(var i=0; i< this.dealsprofilecontent.length; i++){
        //         this.initialMarkers(this.dealsprofilecontent[i]["markerid"]);       
        //     }
        // }).catch((error) => alert(error));
        
    }
    // async initialMarkers(paramId) {
    //     try {
    //         const marker_profile_string = await this.markerprofileService.getMarkerprofile(paramId);
    //         let individualMarkerprofile = JSON.parse(marker_profile_string);
    //         this.marker_profile.push(individualMarkerprofile);
    //         console.log("[*] Marker AUX" + JSON.stringify(this.marker_profile));
    //     } catch(err) {
    //         console.log(err);
    //     }

    //     // this.markerprofileService.getMarkerprofile(paramId).then((data) => {
    //     //     let individualMarkerprofile = JSON.parse(data);
    //     //     this.marker_profile.push(individualMarkerprofile);
    //     //     console.log("[*] Marker AUX" + JSON.stringify(this.marker_profile));
    //     // }).catch((error) => alert(error));        
    // }    

  async getCurrentHotDeals() {

      try {
          const user_marker_profile: Dealsprofile[] = await this.dealsprofileService.getTrendingDeals();
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_marker_profile;
      } catch(err) {
          console.log(err);
      }
      
  }

  async getTypesMarkerByUsers(idUser: string) {

      try {
          const user_type: Usersinterests[] = await this.usersinterestsService.getTypesFromUsers(idUser);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_type;
      } catch(err) {
          console.log(err);
      }
      
  }

  async getMarkerByType(typeIds: string) {


      try {
          const marker_type: Markerprofile[] = await this.markerprofileService.getMarkerByType(typeIds);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return marker_type;
      } catch(err) {
          console.log(err);
      }
      
  }    

  async getUsersInterestsDeals(markersIds: string) {

      try {
          const user_marker_profile: Dealsprofile[] = await this.dealsprofileService.getDealsprofile(markersIds);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_marker_profile;
      } catch(err) {
          console.log(err);
      }
      
  }    

}
