import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { User } from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  	constructor(private restAPI: RestService) { }

  	public getUser(userId: string): Promise<User> {

  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}
}
