import { Document } from 'mongoose';

export interface VideoModel extends Document {
    readonly title: String,
    readonly author: String,
    readonly availableResolutions: [String],
    readonly canBeDownloaded: Boolean,
    readonly minAgeRestriction: Number,
    readonly publicationDate: String,
    readonly createdAt: String,
}