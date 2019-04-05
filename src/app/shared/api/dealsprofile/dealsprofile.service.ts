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

  public getTrendingDeals(): Promise<Dealsprofile[]> {
      let headers = null;


      let promise = this.restAPI.get(config.apiUrl + `/dealsprofile/filter/hotdeals`, headers);
      
    return promise;
  }

	public getSpecificDeal(idDeal: string): Promise<Dealsprofile> {
  		let headers = null;


  		let promise = this.restAPI.get(config.apiUrl + `/dealsprofile/onedeal${idDeal}`, headers);
  		
		return promise;
	}	

	public updateTicketsForDeal(idDeal: string, bodyRequest: Dealsprofile): Promise<Dealsprofile> {

      console.log("[*] Service body" + JSON.stringify(bodyRequest));

      console.log("[*] Service id" + idDeal);

  		let headers = { "Content-Type": "application/json" };

  		let promise = this.restAPI.put(config.apiUrl + `/dealsprofile/update/${idDeal}`, bodyRequest, headers);
  		
		return promise;
	}	

}
