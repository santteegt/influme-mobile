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

  		let promise = this.restAPI.get(config.apiUrl + `/markerprofile/search/${titlemarker}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

  public getMarkerByType(idsTypes: string): Promise<Markerprofile[]> {

      let headers = null;

      let promise = this.restAPI.get(config.apiUrl + `/markerprofile/${idsTypes}`, headers);
      // let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
      
    return promise;
  }

	public updateFollowersMarker(idMarker: string, bodyRequest: Markerprofile): Promise<Markerprofile> {
  		let headers = { "Content-Type": "application/json" };

  		let promise = this.restAPI.put(config.apiUrl + `/markerprofile/update/${idMarker}`, bodyRequest, headers);
  		
		return promise;
	}		
}
