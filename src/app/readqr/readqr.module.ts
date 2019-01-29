import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ReadqrRoutingModule } from './readqr-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ReadqrComponent } from './readqr.component';

import { SharedModule } from "../shared/shared.module";

import { registerElement } from "nativescript-angular/element-registry";
import { BarcodeScanner } from "nativescript-barcodescanner";

registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

@NgModule({
  declarations: [ReadqrComponent],
  imports: [
    ReadqrRoutingModule,
    NativeScriptCommonModule,
    SharedModule
  ],
  providers: [
    BarcodeScanner
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReadqrModule { }
