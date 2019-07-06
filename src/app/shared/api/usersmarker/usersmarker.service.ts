import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Usersmarker } from "../../models/usersmarker.model";
import { Usersmarkerextend } from "../../models/usersmarkerextend.model";

@Injectable({
  providedIn: 'root'
})
export class UsersmarkerService {

 	constructor(private restAPI: RestService) { }

	// // public saveFollowerMarker(idUser: string, idMarker: string, bodyRequest: Usersmarker): Promise<Usersmarker> {
	// public saveFollowerMarker(bodyRequest: Usersmarker): Promise<Usersmarker> {

	// 	let headers = null;

	// 	let promise = this.restAPI.put(config.apiUrl + `/usersmarker`, bodyRequest, headers);
		
	// return promise;
	// }

	public getRecordFollow(userid: string, markerid: string): Promise<Usersmarker[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersmarker/${userid}/${markerid}`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}
	public updateFollowersMarker(userid, markerid: string, bodyRequest: Usersmarker): Promise<Usersmarker> {
		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.put(config.apiUrl + `/usersmarker/update/${userid}/${markerid}`, bodyRequest, headers);
		
	return promise;
	}

	public saveFollowersMarker(bodyRequest: Usersmarker): Promise<Usersmarker> {
		let headers = { "Content-Type": "application/json" };

		let promise = this.restAPI.post(config.apiUrl + `/usersmarker`, bodyRequest, headers);
		
	return promise;
	}	

	// public getFollowingRecords(userid: string): Promise<Usersmarkerextend[]> {
	public getFollowingRecords(userid: string): Promise<any[]> {


  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/usersmarker/report/${userid}`, headers);


  		
		return promise;
	}	
}
