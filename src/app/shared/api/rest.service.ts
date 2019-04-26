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
		// if(content){
		// 	// console.log("{*} RestService "+ JSON.stringify(content));
		// 	reqParams['content'] = JSON.stringify(content);
		// }

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

  	public put(url: string, contentBody: object, headers: object): Promise<any> {

  		console.log("{www} : " + JSON.stringify(contentBody));
		const p = new Promise((resolve, reject) => {

			request({
			    url: url,
			    method: "PUT",
			    headers: headers,
			    content: JSON.stringify(contentBody)
			    // content: JSON.stringify({followers: 1})

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

  	public delete(url: string, headers: object): Promise<any> {

		const p = new Promise((resolve, reject) => {

			request({
			    url: url,
			    method: "DELETE",
			    // headers: headers,
			    // content: JSON.stringify(contentBody)
			    // content: JSON.stringify({followers: 1})

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
