import { Typemarker } from '../models/typemarker.model';


export interface Markerprofile {
	_id: string;
	title: string;
	facebookid: string;
	instagramid: string;
	shortdescription: string;
	type: Typemarker;
	lat: number;
	lon: number;
	picturehome: string;
	web: string;
	followers: number;
	address: string;
	images: string[];
	// __v?: number;
}