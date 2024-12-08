import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    metaDescription: {
        type: String,
        required: false
    },
    featureImage: {
        type: String,
    }
}, { timestamps: true });


export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);