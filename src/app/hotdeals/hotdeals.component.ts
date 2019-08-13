import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ViewChild, NgZone} from '@angular/core';
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
import { GridLayout, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Data } from "../providers/data/data";
import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";
import { ImagesService } from "../shared/api/images/images.service";
import { GestureEventData, GestureTypes } from "tns-core-modules/ui/gestures";
import { Color } from "tns-core-modules/color";
import { Label } from "tns-core-modules/ui/label";




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

  // Para margen titulo segun dispositivo
  @ViewChild("maintitle") stackMainTitle: ElementRef;
  titleNativeStack: GridLayout;   

// GridLayout para hotdeals
  @ViewChild("myNgStack") stackRef: ElementRef;
  myNativeStack: GridLayout;

  // GridLayout para hotdeals
  @ViewChild("myCategory") stackMyCategory: ElementRef;              
  categoryNativeStack: StackLayout;    


  // public newImage: Image; 
  // public newLabel: Label; 
  // public newLabelA: Label; 
  // public newScroll: ScrollView;
  // public newStackLayoutLabel: StackLayout;
  // // public newStackLayoutLabel: StackLayout;
  // public newStackLayoutImages: StackLayout;
  // public newGridLayoutImages: GridLayout;
  // private jsonuser: any;
  public userIdentification: string;

  
  myDataArray: any;
  categoryDeals: any;
  keys: any;  
  tesarray:any = [];

  constructor(private page: Page, private route: ActivatedRoute,
    private _routerExtensions: RouterExtensions, private data: Data, 
    private usersdealsService: UsersdealsService, private imagesService: ImagesService,
    private ngZone: NgZone) { 

    this.page.actionBarHidden = true;

    this.myDataArray = this.data.storage_varb;
    this.categoryDeals = this.data.storage_vara;

    this.tesarray.push("res://zola/zola1");
    this.tesarray.push("res://zola/zola2");

    

    if(localstorage.getItem('ResultLogin') != null){
        let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
        this.userIdentification = userLoginRecord.info._id;
    }

  }

  ngOnInit() {

    this.titleNativeStack = this.stackMainTitle.nativeElement;

    this.myNativeStack = this.stackRef.nativeElement;

    this.categoryNativeStack = this.stackMyCategory.nativeElement;


    //Get number model of iphone
    let modelSplit = nsPlatform.device.model.split("iPhone");
    let textModel = modelSplit[1].split(",");
    let numberModel = parseInt(textModel[0]);

    console.log("Number model "+numberModel);

    // if (nsPlatform.device.model.includes("11")){
    if (numberModel >= 11){
        this.titleNativeStack.paddingTop = 93;

    }else{
        this.titleNativeStack.paddingTop = 20;
    }


  }

  ngAfterViewInit(){




    this.myDataArray.forEach(async (element, index) => {

        this.setImagesHotDeals(element, index);
    });


    this.categoryDeals.forEach( async (elementa, index) => {

        this.setImagesDealsByMarker(elementa, index);
    });    




    // this.myDataArray = new Array<any>(
    //  {"img": "res://icons/filterA", "title": "Filtro A"}, 
    //  {"img": "res://icons/filterB", "title": "Filtro B"} 
    // );


    // const carousel = this.carouselRef.nativeElement as Carousel;

  //      this.newImage = new Image();          
  //      this.newImage.src = "res://icons/filterA";
  //      this.newImage.stretch = "aspectFill";
  //      this.newImage.height = 30;
  //      this.newImage.width = 40;
  //      this.caruselItem = new CarouselItem(); 
  //      this.caruselItem.addChild(this.newImage); 
  //      carousel.addChild(this.caruselItem);

  //      this.newImage = new Image();          
  //      this.newImage.src = "res://icons/filterB";
  //      this.newImage.stretch = "aspectFill";
  //      this.newImage.height = 30;
  //      this.newImage.width = 40;       
  //      this.caruselItem = new CarouselItem(); 
  //      this.caruselItem.addChild(this.newImage); 
  //      carousel.addChild(this.caruselItem);
  }


  public setImagesDealsByMarker(elementDealsA, index){
      
      var element = elementDealsA;
      var j = index;

      // const firstColumn = new ItemSpec(300, "pixel");

          const newLabel = new Label();
          newLabel.text = this.getRecordId(element);
          newLabel.style.fontFamily = "SFProDisplay-Bold";
          newLabel.style.fontSize = 22;
          newLabel.style.fontWeight = "bold";
          newLabel.style.color = new Color("black");

          const newLabelA = new Label();
          newLabelA.text = "";
          newLabelA.width = 310;
          newLabelA.height = 10;
          newLabelA.style.borderBottomColor = new Color("#757171");
          newLabelA.style.borderBottomWidth = 2;


          const newStackLayoutLabel = new StackLayout();
          newStackLayoutLabel.style.paddingLeft = 36;
          newStackLayoutLabel.style.paddingTop = 10;
          newStackLayoutLabel.style.paddingRight = 36;
          newStackLayoutLabel.addChild(newLabel);
          newStackLayoutLabel.addChild(newLabelA);
          
          const newStackLayoutImages = new StackLayout();
          newStackLayoutImages.orientation="horizontal";
          newStackLayoutImages.className="list-group";
          newStackLayoutImages.height=250;
          newStackLayoutImages.backgroundColor= new Color("#E8E6E6");
          newStackLayoutImages.horizontalAlignment="center";

          const newGridLayoutImages = new GridLayout();
          newGridLayoutImages.backgroundColor = new Color("#E8E6E6");
          newGridLayoutImages.className="list-group-item m-15 active";   
          newGridLayoutImages.addRow(new ItemSpec(1, "star"));  

          element[this.getRecordId(element)].forEach( (elementSingleDeal, index) => {

            var i = index;
            var elementSingleDealCopy = elementSingleDeal;        

             this.getImageFilter(elementSingleDeal.img).then(dataImage=> {     
                  const imageDeal = new Image();          
                  imageDeal.src = fromBase64(dataImage.imagesource);
                  imageDeal.id = elementSingleDealCopy._id;
                  imageDeal.stretch = "aspectFit";
                  imageDeal.width = 612;
                  imageDeal.height = 360;
                  imageDeal.on(GestureTypes.tap, function (args: GestureEventData ) { 
                    if(this.userIdentification!=null){                              
                      let widgetImage = <Image>args.object;
                      // let json_deal_selected: Dealsprofile[] = this.categoryDeals.filter(d => d._id === widgetImage.id);
                      let json_deal_selected: Dealsprofile = elementSingleDealCopy;
                      let navigationExtras: NavigationExtras = {
                          queryParams: {
                              "DealMarker": JSON.stringify([json_deal_selected]),
                              "MarkerProfile": JSON.stringify(json_deal_selected.markerid)                      

                            }
                      };
                      this.ngZone.run(() => this._routerExtensions.navigate(['dealprofile'], navigationExtras)).then();
                    }else{
                      this.ngZone.run(() => this._routerExtensions.navigate(["login"], {animated: false})).then();
                    }  
                  }, this);                  

                  newGridLayoutImages.addColumn(new ItemSpec(300, "pixel"));
                  newGridLayoutImages.addChildAtCell(imageDeal, 0, i);    

            });


          });
          
          newStackLayoutImages.addChild(newGridLayoutImages);

          // element[this.getRecordId(element)].forEach(async (elementImg, index) => {              

          //     var i = index;
          //     var elementImgCopy = elementImg;        
          //     console.log("elementImgCopy " + elementImgCopy.img);     
          //     var x = j;              

          //     this.getImageFilter(elementImgCopy.img).then(dataImages=> {     


          //         this.newImage = new Image();          
          //         this.newImage.src = fromBase64(dataImages.imagesource);
          //         this.newImage.id = elementImgCopy._id;
          //         this.newImage.stretch = "aspectFit";
          //         this.newImage.width = 612;
          //         this.newImage.height = 360;
          //         this.newImage.on(GestureTypes.tap, function (args: GestureEventData ) { 
          //           if(this.userIdentification!=null){                              
          //             let widgetImage = <Image>args.object;
          //             // let json_deal_selected: Dealsprofile[] = this.categoryDeals.filter(d => d._id === widgetImage.id);
          //             let json_deal_selected: Dealsprofile = elementImgCopy;
          //             let navigationExtras: NavigationExtras = {
          //                 queryParams: {
          //                     "DealMarker": JSON.stringify([json_deal_selected]),
          //                     "MarkerProfile": JSON.stringify(json_deal_selected.markerid)                      

          //                   }
          //             };
          //             this.ngZone.run(() => this._routerExtensions.navigate(['dealprofile'], navigationExtras)).then();
          //           }else{
          //             this.ngZone.run(() => this._routerExtensions.navigate(["login"], {animated: false})).then();
          //           }  
          //         }, this);                  
                    
          //           this.newGridLayoutImages.addColumn(new ItemSpec(300, "pixel"));
          //           this.newGridLayoutImages.addChildAtCell(this.newImage, 0, i);    

          //           // this.newStackLayoutImages.addChild(this.newGridLayoutImages);                                        
                    
          //     });


              
          // });

                                           
          // this.newStackLayoutImages.addChild(this.newGridLayoutImages);                       

          const newScroll = new ScrollView();
          newScroll.scrollBarIndicatorVisible = false;
          newScroll.orientation="horizontal";
          newScroll.backgroundColor=new Color("#E8E6E6");
          newScroll.height=200;          
          newScroll.content = newStackLayoutImages;
          
          this.categoryNativeStack.addChild(newStackLayoutLabel);
          this.categoryNativeStack.addChild(newScroll);
  }  

  public setImagesHotDeals(elementDeals, index){

    var i = index;
    var element = elementDeals;
    // const firstColumn = 

    this.getImageFilter(element.img).then(dataImages=> {    

          const newImageDeal = new Image();          
          newImageDeal.src = fromBase64(dataImages.imagesource);
          newImageDeal.id = element._id;
          newImageDeal.stretch = "aspectFit";
          newImageDeal.width = 612;
          newImageDeal.height = 360;
          newImageDeal.on(GestureTypes.tap, function (args: GestureEventData ) { 
            if(this.userIdentification!=null){        
              let widgetImage = <Image>args.object;
              let json_deal_selected: Dealsprofile[] = this.myDataArray.filter(d => d._id === widgetImage.id);
              let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "DealMarker": JSON.stringify(json_deal_selected),
                      "MarkerProfile": JSON.stringify(json_deal_selected[0].markerid)                      

                    }
              };
              this.ngZone.run(() => this._routerExtensions.navigate(['dealprofile'], navigationExtras)).then();
            }else{
              this.ngZone.run(() => this._routerExtensions.navigate(["login"], {animated: false})).then();
            }  
          }, this);

          this.myNativeStack.addColumn(new ItemSpec(300, "pixel"));
          this.myNativeStack.addChildAtCell(newImageDeal, 0, i);                          

    });    
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

    goinbox() {

        this._routerExtensions.navigate(["inbox"]);

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

    // goToDealImage(itemSelected: Dealsprofile){

    //   let dealMarker: Dealsprofile[] = [];

    //   dealMarker.push(itemSelected);

    //   // console.log("[*] MarkerProfile " + JSON.stringify(itemSelected.markerid));
    //   // console.log("[*] Deal[] " + JSON.stringify(dealMarker));


    //   let navigationExtras: NavigationExtras = {
    //       queryParams: {
    //           "DealMarker": JSON.stringify(dealMarker),
    //           "MarkerProfile": JSON.stringify(itemSelected.markerid)
    //         }
    //   };
    //   this._routerExtensions.navigate(['dealprofile'], navigationExtras);      

    // }   

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
