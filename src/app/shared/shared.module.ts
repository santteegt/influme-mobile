import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

@NgModule({
 	imports: [ 
 		CommonModule,
 		NativeScriptLocalizeModule,
	],
 	declarations: [
	],
	exports: [
	 	CommonModule,
	 	NativeScriptLocalizeModule
	]
})
export class SharedModule { }