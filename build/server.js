import express from 'express';
import dotenv from 'dotenv';
import { user } from './models.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3049;
app.get('/', (req, res) => {
    res.send(user);
});
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});
