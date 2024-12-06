import asyncHandler from "express-async-handler";
import postModel from "../models/post.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addPost = asyncHandler(async (req, res) => {
    const {
        projectName,
        location,
        price,
        status,
        about,
        overView,
        configurationContent,
        amenitiesContent,
        priceContent,
        projectType,
        noOfUnits,
        noOfFloors,
        projectStatus,
        builder,
        totalLandArea,
        sizeRange,
        unitVariants,
        possessionTime,
        towersAndBlocks,
        reraNo,
        content,
    } = req.body;

    const priceDetailsData = req.body.priceDetails;
    let priceDetails;
    if (priceDetailsData) {
        priceDetails = JSON.parse(req.body.priceDetails);
    }
    const galleryImages = req.files['gallery'];
    if (!projectName) {
        return res.status(402).json({ success: false, message: "projectName is required" })
    }
    try {
        let uploadedImage;
        const featureImage = req.files["featureImage"];
        if (featureImage) {
            uploadedImage = await uploadOnCloudinary(featureImage[0].path);
        }
        const uploadedGalleryImages = [];
        if (galleryImages) {
            for (const image of galleryImages) {
                const uploadedImage = await uploadOnCloudinary(image.path);
                uploadedGalleryImages.push(uploadedImage);
            }
        }
        const post = await postModel.create({
            projectName,
            location,
            price,
            status,
            about,
            overView,
            configurationContent,
            amenitiesContent,
            priceContent,
            projectType,
            noOfUnits,
            noOfFloors,
            projectStatus,
            builder,
            totalLandArea,
            sizeRange,
            unitVariants,
            possessionTime,
            towersAndBlocks,
            reraNo,
            priceDetails,
            gallery: uploadedGalleryImages,
            content,
            featureImage: uploadedImage
        });

        res.status(200).json({
            success: true,
            message: "Post added successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add"
        })
    }
});

export const getPost = asyncHandler(async (req, res) => {
    try {
        const post = await postModel.findOne({});

        if (!post) {
            return res.status(404).json({ success: false, message: "Post Not Found" });
        }

        res.status(200).json({ success: true, message: "Post fetched successfully", post });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch data"
        })
    }
});

export const updatePost = asyncHandler(async (req, res) => {
    const {
        projectName,
        location,
        price,
        status,
        about,
        overView,
        configurationContent,
        amenitiesContent,
        priceContent,
        projectType,
        noOfUnits,
        noOfFloors,
        projectStatus,
        builder,
        totalLandArea,
        sizeRange,
        unitVariants,
        possessionTime,
        towersAndBlocks,
        reraNo,
        content,
    } = req.body;
    const priceDetailsData = req.body.priceDetails;
    let priceDetails;
    if (priceDetailsData) {
        priceDetails = JSON.parse(req.body.priceDetails);
    }
    const existingGallery = req.body.existingGallery || [];
    const newGalleryImages = req.files['gallery'] || [];
    let uploadedImage;
    const featureImage = req.files["featureImage"];
    if (featureImage) {
        uploadedImage = await uploadOnCloudinary(featureImage[0].path);
    }

    const uploadedGalleryImages = [];
    if (existingGallery) {
        existingGallery.forEach((image) => {
            uploadedGalleryImages.push(image);
        })
    }
    if (newGalleryImages) {
        for (const image of newGalleryImages) {
            const uploadedImage = await uploadOnCloudinary(image.path);
            uploadedGalleryImages.push(uploadedImage);
        }
    }

    const post = await postModel.findOne({});

    if (!post) {
        return res.status(404).json({ success: false, message: "Post Not Found" });
    }

    const updatedPostData = {
        projectName: projectName || post.projectName,
        location: location || post.location,
        price: price || post.price,
        status: status || post.status,
        about: about || post.about,
        overView: overView || post.overView,
        configurationContent: configurationContent || post.configurationContent,
        amenitiesContent: amenitiesContent || post.amenitiesContent,
        priceContent: priceContent || post.priceContent,
        projectType: projectType || post.projectType,
        noOfUnits: noOfUnits || post.noOfUnits,
        noOfFloors: noOfFloors || post.noOfFloors,
        projectStatus: projectStatus || post.projectStatus,
        builder: builder || post.builder,
        totalLandArea: totalLandArea || post.totalLandArea,
        sizeRange: sizeRange || post.sizeRange,
        unitVariants: unitVariants || post.unitVariants,
        possessionTime: possessionTime || post.possessionTime,
        towersAndBlocks: towersAndBlocks || post.towersAndBlocks,
        reraNo: reraNo || post.reraNo,
        content: content || post.content,
        priceDetails: priceDetails || post.priceDetails,
        gallery: uploadedGalleryImages || post.gallery,
        featureImage: uploadedImage || post.featureImage // Only update featureImage if a new image is uploaded
    };

    const updatedPost = await postModel.findOneAndUpdate({}, updatedPostData, { new: true });
    if (!updatedPost) {
        return res.status(403).json({ success: false, message: "Failed to update post" });
    };

    res.status(200).json({ success: true, message: "Post updated successfully", updatedPost });
})
