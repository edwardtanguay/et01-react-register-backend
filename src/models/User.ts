import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: String,
	hash: String,
	firstName: String,
	lastName: String,
	accessGroups: [String],
	email: String,
	confirmCode: String
});

export const User = mongoose.model('user', userSchema);
