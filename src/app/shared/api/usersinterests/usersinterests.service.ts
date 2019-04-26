import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Usersinterests } from "../../models/usersinterests.model";
import { Usersinterestsextend } from "../../models/usersinterestsextend.model";


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

	public getTypesFromUsersName(username: string): Promise<Usersinterestsextend[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersinterests/search/${username}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}	

  	public saveUserInterests(bodyRequest: Usersinterests): Promise<Usersinterests> {

		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.post(config.apiUrl + `/usersinterests/`, bodyRequest, headers);
		
		return promise;
	}	

	public deleteUsersInterests(idUser: string): Promise<any> {

		console.log("DELETE service " + idUser);
  		let headers = null;

  		let promise = this.restAPI.delete(config.apiUrl + `/usersinterests/delete/${idUser}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

}
