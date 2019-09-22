import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from "nativescript-barcodescanner";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";  

import { DealsqrcodeService } from "../shared/api/dealsqrcode/dealsqrcode.service";
import { DealsprofileService } from "../shared/api/dealsprofile/dealsprofile.service";

import { Markerprofile } from "../shared/models/markerprofile.model";
import { Dealsprofile } from "../shared/models/dealsprofile.model";
import { Dealsqrcode } from "../shared/models/dealsqrcode.model";

import { localize } from "nativescript-localize";
import * as localstorage from "nativescript-localstorage";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";



  

@Component({
  selector: 'readqr',
  templateUrl: './readqr.component.html',
  styleUrls: ['./readqr.component.css'],
  moduleId: module.id,
})
export class ReadqrComponent implements OnInit {

  deal_profile: Dealsprofile[];
  marker_profile: Markerprofile;
  userIdentification: string;
  private feedback: Feedback;


  constructor(private barcodeScanner: BarcodeScanner, private _routerExtensions: RouterExtensions, 
    private route: ActivatedRoute, private page: Page, private dealsqrcodeService: DealsqrcodeService,
    private dealsprofileService: DealsprofileService) { 

    this.feedback = new Feedback();
        
    // this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;

    // this.extrastitle = "";
    this.route.queryParams.subscribe(params => {
            this.deal_profile = JSON.parse(params["DealMarker"]);
            this.marker_profile = JSON.parse(params["MarkerProfile"]);
        });
}

  ngOnInit() {
        if(localstorage.getItem('ResultLogin') != null){
            let userLoginRecord = JSON.parse(localstorage.getItem('ResultLogin'));
            this.userIdentification = userLoginRecord.info._id;
        }
  }

  public onScanResult(evt) {
    
    console.log("Ecaneo el codigo QR: " + evt.text);
    //alert(`onScanResult: ${evt.text} (${evt.format})`);
    // alert("Congratulations!!")
    dialogs.alert({
        title: "Successful",
        message: "Code read correctly!!!!",
        okButtonText: "Close"
    }).then(() => {
      
      this.barcodeScanner.stop();

      this.verifyCodeqr(evt.text).then(dataResponseVerify => {

        if(dataResponseVerify!=null){
          if(dataResponseVerify.length>0){
            if(dataResponseVerify[0].dealid === this.deal_profile[0]._id)   {

                    let objectUsersDealsCodeqr = {} as Dealsqrcode;
                    objectUsersDealsCodeqr = dataResponseVerify[0]
                    objectUsersDealsCodeqr.userid = this.userIdentification;
                    objectUsersDealsCodeqr.dateused = new Date();
                    objectUsersDealsCodeqr.isused = true;

                    this.postUserDealCodeqr(evt.text, objectUsersDealsCodeqr).then(dataResponse => {

                              console.log("{****} Grabo readr");

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
            }else{
              this.printError("error_read_qr1");
              this._routerExtensions.navigate(["viewmap"], {clearHistory: true});              
            }

          }else{

            this.printError("error_read_qr");
            this._routerExtensions.navigate(["viewmap"], {clearHistory: true});

          }
        }else{
            this.printError("error_read_qr")
            this._routerExtensions.navigate(["viewmap"], {clearHistory: true});
        }


      });
      

    });


  }

  printError(textError){
      this.feedback.show({
            title: "Error Selection",
            message: localize(textError),
            duration: 2500,
            titleFont: "SFProDisplay-Bold",
            titleSize: 16,
            messageFont: "SFProDisplay-Regular",
            messageSize: 13,
            type: FeedbackType.Error,
            onTap: () => {
              console.log("showError tapped");
            }
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


  async postUserDealCodeqr(codeQrScanned, objectUpdate: Dealsqrcode) {

      try {
          const user_deal: Dealsqrcode = await this.dealsqrcodeService.saveUsedCodeqr(codeQrScanned,objectUpdate);
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

  async verifyCodeqr(codeqr) {

      try {
          const profileQR: Dealsqrcode[] = await this.dealsqrcodeService.getProfileCodeqr(codeqr);      
          return profileQR;
        } catch(err) {
      console.log(err);
        }
        
    }  


}
