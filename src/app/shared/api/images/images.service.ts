import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";
import { config } from "../../config";
import { RestService } from "../rest.service";


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

		constructor(private restAPI: RestService) { }	

		public getImagesFiles(idsTypes: string): Promise<any> {

			  let headers = { "Content-Type": "application/x-www-form-urlencoded" };

			  let promise = this.restAPI.get(config.apiUrl + `/image/${idsTypes}`, headers);

			  return promise;
		}
}
