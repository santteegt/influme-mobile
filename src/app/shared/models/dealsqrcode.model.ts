// import { Dealsprofile } from '../models/dealsprofile.model';
// User

export interface Dealsqrcode {
	_id: string;
	codeqr: string;
	dealid: string;
	userid?: string;
	isused: Boolean;
	dateused: Date;

}