import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    title: String,
    author: String,
    availableResolutions: [String],
    canBeDownloaded: Boolean,
    minAgeRestriction: Number,
    publicationDate: String,
    createdAt: String,
});