import { Markerprofile } from '../models/markerprofile.model';

export interface Dealsprofile {
	_id: string;
	conditions: string;
	img: string;
	markerid: Markerprofile;
	total_tickets: number;
	used_tickets: number;
	date_expire: Date;

}