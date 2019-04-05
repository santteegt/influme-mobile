import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from "nativescript-barcodescanner";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";  

import { UsersdealsService } from "../shared/api/usersdeals/usersdeals.service";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";

import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { Usersdeals } from "../shared/models/usersdeals.model";



  

@Component({
  selector: 'readqr',
  templateUrl: './readqr.component.html',
  styleUrls: ['./readqr.component.css'],
  moduleId: module.id,
})
export class ReadqrComponent implements OnInit {

  deal_profile: Dealsprofile[];
  marker_profile: Markerprofile;
  userIdentification: string = "5c96f09a6d69fdd962e49c19";


  constructor(private barcodeScanner: BarcodeScanner, private _routerExtensions: RouterExtensions, 
    private route: ActivatedRoute, private page: Page, private usersdealsService: UsersdealsService,
    private dealsprofileService: DealsprofileService) { 
        
    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;

    // this.extrastitle = "";
    this.route.queryParams.subscribe(params => {
            this.deal_profile = JSON.parse(params["DealMarker"]);
            this.marker_profile = JSON.parse(params["MarkerProfile"]);
        });
}

  ngOnInit() {
  }

  public onScanResult(evt) {
    // console.log(evt.object);
    //alert(`onScanResult: ${evt.text} (${evt.format})`);
    // alert("Congratulations!!")
    dialogs.alert({
        title: "Successful",
        message: "Congratulations!!, the discount is yours",
        okButtonText: "Close"
    }).then(() => {
      
      this.barcodeScanner.stop();
      
      let objectUsersDeals = {} as Usersdeals;
      objectUsersDeals.userid = this.userIdentification;
      objectUsersDeals.dealid = this.deal_profile[0]._id;

      //save user-deal
      this.postUserDeal(objectUsersDeals).then(dataResponse => {

        let objectTickets = {} as Dealsprofile;
        objectTickets.used_tickets = this.deal_profile[0].used_tickets + 1 ;

        console.log("[**] Update Deals Ticekts " + JSON.stringify(objectTickets));
        
        //update number used_tickets
        this.updateUsedTickets(this.deal_profile[0]._id, objectTickets).then(dataResponseDeal => {

          console.log("[**] Response Update Ticekts " + JSON.stringify(dataResponseDeal));

          this.deal_profile[0].used_tickets = dataResponseDeal.used_tickets;         

          let navigationExtras: NavigationExtras = {
            queryParams: {
                "MarkerProfile": JSON.stringify(this.marker_profile)
              }
          };
          // this._routerExtensions.navigate(["markerprofile"], navigationExtras)
          this._routerExtensions.navigate(["viewmap"], {clearHistory: true});
          // this._routerExtensions.back();


          console.log("Dialog closed!");
        });

      });

    });


  }

  public scanTapped(): void {
   let scan = () => {
    //   this.barcodeScanner.scan({
    //     formats: "QR_CODE, EAN_13",
    //     cancelLabel: "EXIT. Also, try the volume buttons!",
    //     cancelLabelBackgroundColor: "#333333",
    //     showFlipCameraButton: true,
    //     showTorchButton: true,
    //     torchOn: false,
    //     beepOnScan: true,
    //     reportDuplicates: false,
    //     preferFrontCamera: false,
    //     // continuousScanCallback: scanResult => {
    //     //   console.log("result: " + JSON.stringify(scanResult));
    //     //   this.barcodeScanner.stop();
    //     // }
    //   })
    //       .then(result => console.log(JSON.stringify(result)))
    //       .catch(error => console.log("Error", error));
    // };
  this.barcodeScanner.hasCameraPermission()
        .then(granted => granted ? scan() : console.log("Permission denied"))
        .catch(() => {
          this.barcodeScanner.requestCameraPermission()
              .then(() => scan());
        });
    }	
  }


  async postUserDeal(objectUpdate: Usersdeals) {

      try {
          const user_deal: Usersdeals = await this.usersdealsService.saveDealUser(objectUpdate);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return user_deal;
      } catch(err) {
          console.log(err);
      }
      
  }

  async updateUsedTickets(dealId, objectUpdate: Dealsprofile) {

      try {

          const tickets_deal_update: Dealsprofile = await this.dealsprofileService.updateTicketsForDeal(dealId, objectUpdate);
          // var dealsprofilecontent: any = JSON.parse(deals_profile); 
          return tickets_deal_update;
      } catch(err) {
          console.log(err);
      }
      
  }  


}
