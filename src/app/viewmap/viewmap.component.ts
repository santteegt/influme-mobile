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


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: 'viewmap',
  templateUrl: './viewmap.component.html',
  styleUrls: ['./viewmap.component.css'],
  moduleId: module.id,
})
export class ViewmapComponent {

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

    // Para mapa
    latitude =  -2.901232;
    longitude = -79.003472;
    zoom = 15;
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

    constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute) {

        this.optionsFilter = [];
        let extrasfilter = "";

        this.route.queryParams.subscribe(params => {
            extrasfilter = params["DataList"];
        });

        this.optionsFilter = JSON.parse(extrasfilter);

        this.marker_profile = [
                { 
                  "title" : "El Mercado",
                  "snippet" : "Comida tradicional",
                  "tipo": "restaurant",
                  "lat": "-2.901232",
                  "lon": "-79.005040",
                  "picturehome": "res://mercado/mercado",
                  "icontype": "res://icons/filterA"
                },
                // { 
                //   "title" : "Golden Prague Pub",
                //   "snippet" : "Cerveceria artesanal",
                //   "tipo": "bar",
                //   "lat": "-2.906803",
                //   "lon": "-79.003472",         
                //   "picturehome": "res://mercado/mercado",
                //   "icontype": "res://icons/filterB"
                // },

                {
                    "title": "Art Gym",
                    "snippet" : "Gimnasio",
                    "tipo": "gym",
                    "lat": "-2.902862",
                    "lon": "-79.000974",
                    "picturehome": "res://mercado/mercado",
                    "icontype": "res://icons/filterE"
                }

                // {
                //     "title": "Vispera del Chuchaqui",
                //     "snippet" : "Los mejores cocteles",
                //     "tipo": "bar",
                //     "lat": "-2.901466",
                //     "lon": "-79.004752",
                //     "picturehome": "res://mercado/mercado",
                //     "icontype": "res://icons/filterB"
                // },                
                // {
                //     "title": "Clinica Santa Ines",
                //     "snippet" : "Clinica privada",
                //     "tipo": "health",
                //     "lat": "-2.902116",
                //     "lon": "-79.008917",
                //     "picturehome": "res://mercado/mercado",
                //     "icontype": "res://icons/filterG"
                // },
                // {
                //     "title": "Fybeca",
                //     "snippet" : "Farmacia",
                //     "tipo": "health",
                //     "lat": "-2.902523",
                //     "lon": "-79.008042",
                //     "picturehome": "res://mercado/mercado",
                //     "icontype": "res://icons/filterG"
                // }
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

        console.log("Icono " + icon_type);

        this.newImage = new Image();
        this.newImage.src = img_marker_selected;
        this.newImage.stretch = "fill";
        this.myNativeStack.addChild(this.newImage);

        this.newImage = new Image();
        this.newImage.src = icon_type;
        this.newImage.stretch = "fill";
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
        this._routerExtensions.navigate(["filtermap"])
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
    this._routerExtensions.navigate(["markerprofile"], navigationExtras)

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
