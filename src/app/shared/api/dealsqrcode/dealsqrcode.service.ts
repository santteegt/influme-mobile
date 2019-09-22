import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Dealsqrcode } from "../../models/dealsqrcode.model";


@Injectable({
  providedIn: 'root'
})
export class DealsqrcodeService {

	constructor(private restAPI: RestService) { }

	public saveUsedCodeqr(codeQr: string, bodyRequest: Dealsqrcode): Promise<Dealsqrcode> {

  		let headers = { "Content-Type": "application/json" };

  		let promise = this.restAPI.put(config.apiUrl + `/dealsqrcode/update/${codeQr}`, bodyRequest, headers);
  		
		return promise;
	}	

	public getProfileCodeqr(codeQr: string): Promise<Dealsqrcode[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/dealsqrcode/search/one/qr/${codeQr}`, headers);
  		
		return promise;
	}	


	public getAllDealsSubscribe(userID: string): Promise<Dealsqrcode[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/dealsqrcode/search/all/${userID}`, headers);
  		
		return promise;
	}

}
