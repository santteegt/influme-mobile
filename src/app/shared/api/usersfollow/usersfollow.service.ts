import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Usersfollow } from "../../models/usersfollow.model";
import { Usersfollowextend } from "../../models/usersfollowextend.model";



@Injectable({
  providedIn: 'root'
})
export class UsersfollowService {

  constructor(private restAPI: RestService) { }

	public getRecordFollow(userid: string, useridfollow: string): Promise<Usersfollow[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersfollow/${userid}/${useridfollow}`, headers);
  		
		return promise;
	}
	public updateFollowersUser(userid, useridfollow: string, bodyRequest: Usersfollow): Promise<Usersfollow> {
		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.put(config.apiUrl + `/usersfollow/update/${userid}/${useridfollow}`, bodyRequest, headers);
		
	return promise;
	}

	public saveFollowersUser(bodyRequest: Usersfollow): Promise<Usersfollow> {
		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.post(config.apiUrl + `/usersfollow`, bodyRequest, headers);
		
	return promise;
	}
	
	public getFollowingRecords(userid: string): Promise<Usersfollowextend[]> {

  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersfollow/report/following/${userid}`, headers);


  		
		return promise;
	}

	public getFollowersRecords(userid: string): Promise<any[]> {

  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersfollow/report/followers/${userid}`, headers);


  		
		return promise;
	}	
}
