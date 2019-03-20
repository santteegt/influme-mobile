import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Markerprofile } from "../../models/markerprofile.model";

@Injectable({
  providedIn: 'root'
})
export class MarkerprofileService {

 	constructor(private restAPI: RestService) { }

	// public getMarkerprofile(userId: string): Promise<User> {
	public getMarkerprofile(titlemarker: string): Promise<Markerprofile[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/markerprofile/${titlemarker}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}
}
