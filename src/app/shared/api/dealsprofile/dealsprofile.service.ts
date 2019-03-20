import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Dealsprofile } from "../../models/dealsprofile.model";

@Injectable({
  providedIn: 'root'
})
export class DealsprofileService {

 	constructor(private restAPI: RestService) { }

	// public getMarkerprofile(userId: string): Promise<User> {
	public getMarkerWithDealsAvailable(): Promise<Dealsprofile[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + '/dealsprofile/filter', headers);
  		
		return promise;
	}
	public getDealsprofile(markerid: string): Promise<Dealsprofile[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/dealsprofile/${markerid}`, headers);
  		
		return promise;
	}	

	public getSpecificDeal(idDeal: string): Promise<Dealsprofile> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/dealsprofile/onedeal${idDeal}`, headers);
  		
		return promise;
	}	

}
