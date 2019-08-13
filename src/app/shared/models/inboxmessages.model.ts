import { Dealsprofile } from '../models/dealsprofile.model';

export interface Inboxmessages {
	_id: string;
	title: string;
	hour: string;
	description: string;
	dealid: Dealsprofile;

}