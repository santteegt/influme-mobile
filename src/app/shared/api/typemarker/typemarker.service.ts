import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Typemarker } from "../../models/typemarker.model";


@Injectable({
  providedIn: 'root'
})
export class TypemarkerService {

  constructor(private restAPI: RestService) { }

	public getAllTypes(): Promise<Typemarker[]> {
  		let headers = null;

  		let promise = this.restAPI.get(config.apiUrl + `/typemarker`, headers);
  		// let promise = this.restAPI.get(config.apiUrl + `/users/${userId}`, headers);
  		
		return promise;
	}

}
