import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    projectType: {
        type: String,
        required: true
    },
    noOfUnits: {
        type: String,
        required: true
    },
    projectStatus: {
        type: String,
        required: true
    },
    builder: {
        type: String,
        required: true
    },
    totalLandArea: {
        type: String,
        required: true
    },
    sizeRange: {
        type: String,
        required: true
    },
    unitVariants: {
        type: String,
        required: true
    },
    possessionTime: {
        type: String,
        required: true
    },
    towersAndBlocks: {
        type: String,
        required: true
    },
    reraNo: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    featureImage: {
        type: String,
    }
}, { timestamps: true });


export default mongoose.models.Post || mongoose.model('Post', PostSchema);