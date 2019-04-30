import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Usersdeals } from "../../models/usersdeals.model";


@Injectable({
  providedIn: 'root'
})
export class UsersdealsService {

  constructor(private restAPI: RestService) { }

  	public saveDealUser(bodyRequest: Usersdeals): Promise<Usersdeals> {

		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.post(config.apiUrl + `/usersdeals`, bodyRequest, headers);
		
	return promise;
	}

	public getAllDealsSubscribe(userID: string): Promise<Usersdeals[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersdeals/search/${userID}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

	public getDealsByUser(userID: string,dealID: string ): Promise<Usersdeals[]> {
		let headers = null;

		let promise = this.restAPI.get(config.apiUrl + `/usersdeals/search/one/${userID}/${dealID}`, headers);
		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
		
	  return promise;
  }	

}
