
export interface User {

	_id: string;
	username: string;
	name: string;
	city: string;
	picturehome: string;
	followers: number;
	following: number;
	email: string;
	influencer: boolean;
	error?: string;
	
}