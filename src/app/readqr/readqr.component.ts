import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from "nativescript-barcodescanner";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";  
  

@Component({
  selector: 'readqr',
  templateUrl: './readqr.component.html',
  styleUrls: ['./readqr.component.css'],
  moduleId: module.id,
})
export class ReadqrComponent implements OnInit {

  extrastitle: string;

  constructor(private barcodeScanner: BarcodeScanner, private _routerExtensions: RouterExtensions, private route: ActivatedRoute, private page: Page) { 
        
    this.page.actionBarHidden = true;
    // this.page.backgroundSpanUnderStatusBar = true;

    this.extrastitle = "";
    this.route.queryParams.subscribe(params => {
            this.extrastitle = params["Titleid"];
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
      // this._routerExtensions.navigate(["markerprofile"], {
      //     clearHistory: true,
      //     animated: true,
      //     transition: {
      //     name: "slideRight",
      //     duration: 350,
      //     curve: "ease"
      //     }
      //  });

      let navigationExtras: NavigationExtras = {
        queryParams: {
            "Titleid": this.extrastitle
          }
      };
      this._routerExtensions.navigate(["markerprofile"], navigationExtras)

        console.log("Dialog closed!");
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
}
