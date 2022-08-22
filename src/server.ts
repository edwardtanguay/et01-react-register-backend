import express from 'express';
import dotenv from 'dotenv';
import { IUser } from './interfaces';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3049;

const user: IUser = {
	firstName: "Hendrick",
	lastName: "Denzmann-changed",
	accessGroups: ['loggedInUsers', 'members']
};

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(user);
});

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
});