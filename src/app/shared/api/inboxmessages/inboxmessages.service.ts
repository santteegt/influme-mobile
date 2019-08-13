import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";
import { Inboxmessages } from "../../models/inboxmessages.model";

@Injectable({
  providedIn: 'root'
})
export class InboxmessagesService {

 	constructor(private restAPI: RestService) { }

	public getAllMessages(): Promise<Inboxmessages[]> {

	  let headers = null;

	  let promise = this.restAPI.get(config.apiUrl + `/inboxmessages`, headers);
	  
	return promise;
	} 	
}
