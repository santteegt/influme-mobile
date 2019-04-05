import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Usersinterests } from "../../models/usersinterests.model";


@Injectable({
  providedIn: 'root'
})
export class UsersinterestsService {

  constructor(private restAPI: RestService) { }

	public getTypesFromUsers(idUser: string): Promise<Usersinterests[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersinterests/${idUser}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

}
