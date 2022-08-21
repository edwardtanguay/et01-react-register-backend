import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3049;
const user = {
    firstName: "Hendrick",
    lastName: "Denzmann",
    accessGroups: ['loggedInUser', 'member']
};
app.get('/', (req, res) => {
    res.addTrailers;
});
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});
