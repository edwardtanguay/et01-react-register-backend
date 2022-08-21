import express from 'express';

const app = express();
const PORT = 3049;

interface IUser {
	firstName: string;
	lastName: string;
	accessGroups: string[];
}

const user: IUser = {
	firstName: "Hendrick",
	lastName: "Denzmann",
	accessGroups: ['loggedInUser', 'member']
};

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(user);
});

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
});