import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Label } from "tns-core-modules/ui/label";
import { Image } from "tns-core-modules/ui/image";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { MarkerprofileService } from "../shared/api/markerprofile/markerprofile.service";
import { Markerprofile } from "../shared/models/markerprofile.model";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { NavigationExtras } from "@angular/router";



@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  moduleId: module.id,
})
export class SearchComponent implements OnInit {

  // @ViewChild("myNgStackLabel") stackRefLabel: ElementRef;
  // myNativeStackLabel: StackLayout;

  // @ViewChild("myNgStackImage") stackRefImage: ElementRef;
  // myNativeStackImage: StackLayout;

  // @ViewChild("myNgStackIcon") stackRefIcon: ElementRef;
  // myNativeStackIcon: StackLayout;    


  @ViewChild("myNgStack") stackRef: ElementRef;
  myNativeStack: StackLayout;

  public newLabel: Label;
  public newImage: Image;
  public newImageIcon: Image;
  public newGridLayout: GridLayout;
  public newStackLayoutLabel: StackLayout;
  public newStackLayoutImage: StackLayout;
  public newStackLayoutIcon: StackLayout;
  public newStackLayout: StackLayout;
  public marker_profile: Markerprofile[] = [];
  // public newStackImage: StackLayout;


	searchPhrase: string = "";

  constructor(private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page,
  	private markerprofileService: MarkerprofileService, private ngZone: NgZone) { 
		// this.page.actionBarHidden = true;

  }

  ngOnInit() {
  	// this.myNativeStackLabel = this.stackRefLabel.nativeElement;
  	// this.myNativeStackImage = this.stackRefImage.nativeElement;
  	// this.myNativeStackIcon = this.stackRefIcon.nativeElement;
  	this.myNativeStack = this.stackRef.nativeElement;

  }

	public searchBarLoaded(args) {
	    let searchBar = <SearchBar>args.object;
	    searchBar.dismissSoftInput();

	    // if (isAndroid) {
	    //     searchBar.android.clearFocus();
	    // }

	    searchBar.text = "";
	}

	
	public onTextChange(args) {		
		
		this.myNativeStack.removeChildren();
	    
	    let searchBar = <SearchBar>args.object;	 

	    if(searchBar.text){
        
        this.getMarkerProfile(searchBar.text).then(dataM => {

	        	this.myNativeStack.removeChildren();

        		this.marker_profile = dataM;

	        	for(var i=0; i<dataM.length; i++){
					
					// Label con titulo de local
		      		this.newLabel = new Label();          
		      		this.newLabel.text = dataM[i].title;
		      		this.newLabel.className = "label-search";

					// Imagen de perfil
		          	this.newImage = new Image();          
		          	this.newImage.src = "res://" + dataM[i].picturehome;
		          	this.newImage.stretch = "fill";
		          	this.newImage.style.width = 55;
		          	this.newImage.style.height = 55;
		          	this.newImage.style.borderRadius = 61;

		          	// Imagen de tipo de local
		          	this.newImageIcon = new Image();          
		          	this.newImageIcon.src = "res://" + dataM[i].type.icontype;
		          	this.newImageIcon.stretch = "fill";
		          	this.newImageIcon.style.width = 8;
		          	this.newImageIcon.style.height = 14;
		          	this.newImageIcon.style.borderRadius = 4;

					// StackLayout para label
		      		this.newStackLayoutLabel = new StackLayout();
		      		// this.newStackLayoutLabel.style.backgroundColor = new Color("#860075");
		      		this.newStackLayoutLabel.horizontalAlignment = "left";	      		
		      		this.newStackLayoutLabel.marginTop = 10;
		      		this.newStackLayoutLabel.marginLeft = 104;		      		
		      		this.newStackLayoutLabel.addChild(this.newLabel);


					// StackLayout para imagen de tipo de local
		      		this.newStackLayoutIcon = new StackLayout();
		      		this.newStackLayoutIcon.style.backgroundColor = new Color("#d9d6e1");
		      		this.newStackLayoutIcon.width = 21;
		      		this.newStackLayoutIcon.height = 21;
	      			this.newStackLayoutIcon.style.borderRadius = 4;
		      		this.newStackLayoutIcon.marginTop = 25;
		      		this.newStackLayoutIcon.marginLeft = 104;
		      		this.newStackLayoutIcon.horizontalAlignment = "left";
		      		this.newStackLayoutIcon.verticalAlignment = "middle";
		      		this.newStackLayoutIcon.addChild(this.newImageIcon);

		      		// StackLayout para imagen de perfil
		      		this.newStackLayoutImage = new StackLayout();
		      		// this.newStackLayoutImage.style.backgroundColor = new Color("#867fbd");
		      		this.newStackLayoutImage.horizontalAlignment = "left"
		      		this.newStackLayoutImage.marginTop = 5;
		      		this.newStackLayoutImage.marginLeft = 36;	      			      			
		      		this.newStackLayoutImage .addChild(this.newImage);

		      		// GridLayout Principal
		        	this.newGridLayout = new GridLayout();	        
		        	this.newGridLayout.id = dataM[i]._id;
		        	this.newGridLayout.addChildAtCell(this.newStackLayoutImage, i, 0);		        		        	
		        	this.newGridLayout.addChildAtCell(this.newStackLayoutLabel, i, 0);	        	
		        	this.newGridLayout.addChildAtCell(this.newStackLayoutIcon, i, 0);	        	
		        	this.newGridLayout.addRow(new ItemSpec(0, GridUnitType.AUTO));
					this.newGridLayout.on(GestureTypes.tap, function (args: GestureEventData ) { 
						let grid = <GridLayout>args.object;						
						let json_deal_selected: Markerprofile[] = this.marker_profile.filter(d => d._id === grid.id);
						let navigationExtras: NavigationExtras = {
						    queryParams: {
						        // "MarkerProfile": JSON.stringify(json_deal_selected)
						        "MarkerProfile": JSON.stringify(json_deal_selected[0])
						      }
						};
						this.ngZone.run(() => this._routerExtensions.navigate(['markerprofile'], navigationExtras)).then();
						// this._routerExtensions.navigate(["markerprofile"], navigationExtras);

					}, this);		        	
		        	this.newGridLayout.height=75;
		        	// this.newGridLayout.style.backgroundColor = new Color("#FF0000");
		      		this.myNativeStack.addChild(this.newGridLayout);
	   			}
	   		// }	
		});
	  } 
	}

	// public onSubmit(args) {
	//     let searchBar = <SearchBar>args.object;
	//     this.searchPhrase = "Submited search query: " + searchBar.text;
	// }  

    async getMarkerProfile(titleName: string) {

        try {
            const marker_profile: Markerprofile[] = await this.markerprofileService.getMarkerprofile(titleName);
            return marker_profile;
        } catch(err) {
            console.log("[*] Error: " + err);
        }
        
    }

}
