import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3049;

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
	res.addTrailers
});

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
});