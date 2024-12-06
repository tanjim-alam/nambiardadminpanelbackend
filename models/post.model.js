import mongoose from "mongoose";

const priceDetailsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    saleableArea: {
        type: String,
        required: false
    }
});

const gallerySchema = new mongoose.Schema({
    url: {
        type: String,
    }
})
const PostSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    about: {
        type: String,
    },
    overView: {
        type: String,
        required: false
    },
    configurationContent: {
        type: String,
        required: false
    },
    amenitiesContent: {
        type: String,
        required: false
    },
    priceContent: {
        type: String,
        required: false
    },
    projectType: {
        type: String,
        required: false
    },
    noOfUnits: {
        type: String,
        required: true
    },
    noOfFloors: {
        type: String,
        required: false
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
    priceDetails: [priceDetailsSchema],
    gallery: [],
    content: {
        type: String,
        required: false
    },
    featureImage: {
        type: String,
    }
}, { timestamps: true });


export default mongoose.models.Post || mongoose.model('Post', PostSchema);