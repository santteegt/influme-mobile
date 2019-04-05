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
}
