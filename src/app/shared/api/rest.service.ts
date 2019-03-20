import { Injectable } from '@angular/core';
import { request } from "tns-core-modules/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

	constructor() { }

	public get(url: string, headers: object): Promise<any> {

		let reqParams = {
			url: url, 
			method: "GET"
		};
		if(headers) {
			reqParams['headers'] = headers;
		}

		const p = new Promise((resolve, reject) => {

			request(reqParams).then((response) => {
			    // Argument (response) is HttpResponse
			    resolve(response.content.toJSON());
			}, (e) => {
				console.log(e);
				reject(e);
			});
		});
		return p;

  	}

  	public post(url: string, content: object, headers: object): Promise<any> {

		const p = new Promise((resolve, reject) => {

			request({
			    url: url,
			    method: "POST",
			    headers: headers,
			    content: JSON.stringify(content)
			}).then((response) => {
			    // Argument (response) is HttpResponse
			    resolve(response.content.toJSON());
			}, (e) => {
				console.log(e);
				reject(e);
			});
		});
		return p;

  	}

}
