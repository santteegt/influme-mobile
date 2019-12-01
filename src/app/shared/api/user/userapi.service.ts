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

	public getUserByName(username: string): Promise<User[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/users/search/${username}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

  	public saveUser(bodyRequest: User): Promise<User> {

		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.post(config.apiUrl + `/users/`, bodyRequest, headers);
		
		return promise;
	}

	public updateUser(idUser: string, bodyRequest: User): Promise<User> {

    console.log("UpdateUser service ************** "+ JSON.stringify(bodyRequest));
  		let headers = { "Content-Type": "application/json" };

  		let promise = this.restAPI.put(config.apiUrl + `/users/update/${idUser}`, bodyRequest, headers);
  		
		return promise;
	}	


  public getifInfluencer(idUser: string): Promise<User[]> {
      let headers = null;

      let promise = this.restAPI.get(config.apiUrl + `/users/search/influencer/${idUser}`, headers);
      // let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
      
    return promise;
  }

  public updateDataInfoInstagram(token: string): Promise<any> {
      let headers = null;

      let promise = this.restAPI.get(`https://api.instagram.com/v1/users/self/?access_token=` + token, headers);
      // let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
      
    return promise;
  }    

  public getRefeshInfoLogin(idUser: string, tkuser: string): Promise<any> {
      let headers = null;

      let promise = this.restAPI.get(config.apiUrl + `/users/search/single/update/${idUser}/${tkuser}`, headers);
      // let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
      
    return promise;
  }  

}
