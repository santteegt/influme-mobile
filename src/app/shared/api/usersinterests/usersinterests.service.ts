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

  // public getTypesFullFromUsers(idUser: string): Promise<Usersinterests[]> {
  public getTypesFullFromUsers(idUser: string): Promise<any[]> {

      let headers = null;

      let promise = this.restAPI.get(config.apiUrl + `/usersinterests/search/full/${idUser}`, headers);
      // let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
      
    return promise;
  }  

	public getTypesFromUsersName(username: string): Promise<Usersinterestsextend[]> {
  		let headers = null;

      console.log("Nombre de Usuario a buscar " + username);

  		let promise = this.restAPI.get(config.apiUrl + `/usersinterests/search/${username}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

	public getTypesFromNickname(username: string): Promise<Usersinterestsextend[]> {
  		let headers = null;      

  		let promise = this.restAPI.get(config.apiUrl + `/usersinterests/search/nick/${username}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

  public getTypesFromId(subid: string): Promise<Usersinterestsextend[]> {
      let headers = null;      

      let promise = this.restAPI.get(config.apiUrl + `/usersinterests/search/sub/${subid}`, headers);
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
