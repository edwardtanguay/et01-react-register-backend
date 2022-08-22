import { IUser } from './interfaces.js';

export const getUsers = (): IUser[] => {
	return [
		{
			username: 'anonymousUser',
			firstName: "Anonymous",
			lastName: "User",
			accessGroups: ['loggedOutUsers']
		},
		{
			username: 'hd',
			firstName: "Hendrick",
			lastName: "Denzmann",
			accessGroups: ['loggedInUsers', 'members']
		}
	];
}