import express from 'express';
import dotenv from 'dotenv';
import { getUsers } from './models.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3049;
const users = getUsers();

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'tempsecret'
	})
);

app.use(cookieParser());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(users);
});

app.post('/login', (req, res) => {
	const username = req.body.username;
	const user = users.find((user) => user.username === username);
	if (user) {
		req.session.user = user;
		req.session.cookie.expires = new Date(Date.now() + 10000); // 10 seconds
		req.session.save();
		res.send(`User logged in: ${JSON.stringify(user)}`);
	} else {
		res.status(500).send('bad login');
	}
});

app.get('/current-user', (req, res) => {
	if (req.session.user) {
		res.send(req.session.user);
	} else {
		res.send('no user logged in');
	}
});

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
});