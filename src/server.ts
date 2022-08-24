import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './models/User.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

const app = express();
const PORT = process.env.PORT || 3045;

app.use(express.json());
app.use(
	cors({
		origin: process.env.FRONTEND_BASE_URL,
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true
	})
);
app.set('trust proxy', 1);

app.use(cookieParser());

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		cookie: {
			httpOnly: true,
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			secure: process.env.NODE_ENV === "production"
		}
	})
);

app.all('/', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});


app.get('/', (req: express.Request, res: express.Response) => {
	res.send(`***${process.env.NODE_ENV}***`);
});

const loginSecondsMax = 10;

const logAnonymousUserIn = async (req: express.Request, res: express.Response) => {
	const user = await User.findOne({ username: 'anonymousUser' });
	if (user) {
		req.session.user = user;
		req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
		req.session.save();
		res.send({
			"currentUser": user
		});
	} else {
		res.status(500).send('bad login');
	}
}

const logUserIn = async (username: string, req: express.Request, res: express.Response) => {
	const user = await User.findOne({ username });
	if (user) {
		req.session.user = user;
		req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
		req.session.save();
		res.send({
			"currentUser": user
		});
	} else {
		logAnonymousUserIn(req, res);
	}
}

app.post('/login', (req: express.Request, res: express.Response) => {
	const username = req.body.username;
	logUserIn(username, req, res);
});

app.get('/current-user', (req: express.Request, res: express.Response) => {
	const user = req.session.user;
	if (user) {
		res.send({
			"currentUser": user
		});
	} else {
		logAnonymousUserIn(req, res);
	}
});

app.get('/logout', (req: express.Request, res: express.Response) => {
	logAnonymousUserIn(req, res);
});

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
});