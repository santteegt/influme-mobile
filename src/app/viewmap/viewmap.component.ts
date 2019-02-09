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
    marker_profile: any;
    // Variable JSON que contiene los parametros de busqueda
    optionsFilter: any;

    constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page) {

        this.page.actionBarHidden = true;
        // this.page.backgroundSpanUnderStatusBar = true;

        // if(jsonuseraux != null){
        //     this.jsonuser = JSON.parse(jsonuseraux);
        // }

        this.optionsFilter = [];
        let extrasfilter = "";

        this.route.queryParams.subscribe(params => {
            extrasfilter = params["DataList"];
        });

        this.optionsFilter = JSON.parse(extrasfilter);

        this.marker_profile = [
                { 
                  "title" : "Mido",
                  "snippet" : "Sushi Restaurant",
                  "tipo": "restaurant", 
                  "lat": "52.501346",
                  "lon": "13.307921",
                  "picturehome": "res://mido/1",
                  "icontype": "res://icons/filterA"
                },
                {
                    "title": "808 Club Berlin",
                    "snippet" : "Night Club",
                    "tipo": "health",
                    "lat": "52.505766",
                    "lon": "13.338038",
                    "picturehome": "res://808/1",
                    "icontype": "res://icons/filterG"
                },
                {
                    "title": "Zola",
                    "snippet" : "Pizza Restaurant",
                    "tipo": "restaurant",
                    "lat": "52.496335",
                    "lon": "13.422261",
                    "picturehome": "res://zola/1",
                    "icontype": "res://icons/filterA"
                },
                {
                    "title": "Sons of Mana",
                    "snippet" : "Hawaiian Cuisine",
                    "tipo": "restaurant",
                    "lat": "52.527582",
                    "lon": "13.408219",
                    "picturehome": "res://sonsofmana/1",
                    "icontype": "res://icons/filterA"
                },
                {
                    "title": "Bar Tausend",
                    "snippet" : "Cocktails-Music-Dining",
                    "tipo": "bar",
                    "lat": "52.521061",
                    "lon": "13.384872",
                    "picturehome": "res://tausend/2",
                    "icontype": "res://icons/filterB"
                },
                {
                    "title": "Aquadom & Sealife Berlin",
                    "snippet" : "Aquarium",
                    "tipo": "hand",
                    "lat": "52.520339",
                    "lon": "13.403782",
                    "picturehome": "res://asb/1",
                    "icontype": "res://icons/filterO"
                },
                {
                    "title": "Berliner Fernsehturm",
                    "snippet" : "Television Tower",
                    "tipo": "painting",
                    "lat": "52.521030",
                    "lon": "13.409430",
                    "picturehome": "res://berliner/5",
                    "icontype": "res://icons/filterM"
                }                
                ]
    }

    ngOnInit() {
        this.myNativeStack = this.stackRef.nativeElement;
        this.myNativeStack1 = this.stackRef1.nativeElement;
    }

    //Map events
    onMapReady(event) {
        
        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        if(this.optionsFilter.length > 0){
            for(var j = 0; j < this.optionsFilter.length; j++){

                let onlyMarker = this.marker_profile.filter(d => d.tipo == this.optionsFilter[j]["type"]);

                for ( var i = 0; i < onlyMarker.length; i++) {
                        var marker = new Marker();
                        marker.position = Position.positionFromLatLng(onlyMarker[i]["lat"],onlyMarker[i]["lon"] );
                        marker.title = onlyMarker[i]["title"];
                        marker.snippet = onlyMarker[i]["snippet"];
                        marker.userData = {index: 1};
                        this.mapView.addMarker(marker);
                }            
            }
        }else
        {
            for ( var i = 0; i < this.marker_profile.length; i++) {
                var marker = new Marker();
                marker.position = Position.positionFromLatLng(this.marker_profile[i]["lat"],this.marker_profile[i]["lon"] );
                marker.title = this.marker_profile[i]["title"];
                marker.snippet = this.marker_profile[i]["snippet"];
                marker.userData = {index: 1};
                this.mapView.addMarker(marker);
            }
        }
    }


    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
        this.showDetails= "collapsed"
    }

    onMarkerEvent(args) {

        this.title_marker_selected = args.marker.title;
        this.des_marker_selected = args.marker.snippet;
        
        let jsonAuxSelect = this.marker_profile.filter(d => d.title == args.marker.title);
        let img_marker_selected = jsonAuxSelect[0]["picturehome"];
        let icon_type = jsonAuxSelect[0]["icontype"];

        //console.log("Icono " + icon_type);
        
        this.myNativeStack.removeChildren();
        this.newImage = new Image();
        this.newImage.src = img_marker_selected;
        this.newImage.stretch = "fill";
        this.myNativeStack.addChild(this.newImage);

        this.myNativeStack1.removeChildren();
        this.newImage = new Image();
        this.newImage.src = icon_type;
        this.newImage.stretch = "fill";
        this.newImage.width = 25;
        this.newImage.height = 25;
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

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "FilterInitial": JSON.stringify(this.optionsFilter)
              }
        };

        this._routerExtensions.navigate(["filtermap"], navigationExtras)
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
            "Titleid": this.title_marker_selected
          }
    };
    this._routerExtensions.navigate(["markerprofile"], navigationExtras);
    

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
