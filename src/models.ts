import { IUser } from './interfaces.js';

export const getUsers = (): IUser[] => {
	return [
		{
			firstName: "Anonymous",
			lastName: "User",
			accessGroups: ['loggedOutUsers']
		},
		{
			firstName: "Hendrick",
			lastName: "Denzmann",
			accessGroups: ['loggedInUsers', 'members']
		}
	];
}