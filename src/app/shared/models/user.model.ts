
export interface User {

	_id: string;
	username: string;
	tokenaccess: string;
	refreshtoken: string;
	token_detail: string;
	subid: any;
	raw_profile: string;
	name: string;
	city: string;
	picturehome: string;
	followers: number;
	following: number;
	email: string;
	influencer: boolean;
	error?: string;
	approvedinfluencer?: boolean;
	
}