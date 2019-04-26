import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Usersdealsextend } from "../../models/usersdealsextend.model";


@Injectable({
  providedIn: 'root'
})
export class UsersdealsextendService {

  constructor(private restAPI: RestService) { }

  	public getAllDealsSubscribe(userID: string): Promise<Usersdealsextend[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersdeals/search/${userID}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}
}
