import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

@NgModule({
 	imports: [ 
 		CommonModule,
 		NativeScriptLocalizeModule
	],
 	declarations: [
	],
	exports: [
	 	CommonModule,
	 	FormsModule,
	 	NativeScriptLocalizeModule
	]
})
export class SharedModule { }