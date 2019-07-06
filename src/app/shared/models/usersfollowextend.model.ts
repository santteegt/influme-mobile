import { User } from '../models/user.model';

export interface Usersfollowextend {
	
	userid: string;
	useridfollow: User;
	status: boolean;

}