import asyncHandler from "express-async-handler";
import postModel from "../models/post.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addPost = asyncHandler(async (req, res) => {
    const {
        projectName,
        about,
        projectType,
        noOfUnits,
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
    if (!projectName) {
        return res.status(402).json({ success: false, message: "projectName is required" })
    }
    let uploadedImage;
    if (req.file) {
        const featureImage = req.file.path;
        // console.log("featureImage2", featureImage)
        uploadedImage = await uploadOnCloudinary(featureImage);
        // console.log("uploadedImage1", uploadedImage)
    }
    // Upload to Cloudinary
    const post = await postModel.create({
        projectName,
        about,
        projectType,
        noOfUnits,
        projectStatus,
        builder,
        totalLandArea,
        sizeRange,
        unitVariants,
        possessionTime,
        towersAndBlocks,
        reraNo,
        content,
        featureImage: uploadedImage
    });

    res.status(200).json({
        success: true,
        message: "Post added successfully",
        post
    });
});

export const getPost = asyncHandler(async (req, res) => {
    try {
        const post = await postModel.findOne({});

        if (!post) {
            return res.status(404).json({ success: false, message: "Post Not Found" });
        }

        res.status(200).json({ success: true, message: "Post fetched successfully", post });
    } catch (error) {
        console.log(error)
    }
});

export const updatePost = asyncHandler(async (req, res) => {
    const {
        projectName,
        about,
        projectType,
        noOfUnits,
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
    let uploadedImage;
    if (req.file) {
        const featureImage = req.file.path;
        // console.log("featureImage2", featureImage)
        uploadedImage = await uploadOnCloudinary(featureImage);
        // console.log("uploadedImage1", uploadedImage)
    }

    const post = await postModel.findOne({});

    if (!post) {
        return res.status(404).json({ success: false, message: "Post Not Found" });
    }

    const updatedPostData = {
        projectName: projectName || post.projectName,
        about: about || post.about,
        projectType: projectType || post.projectType,
        noOfUnits: noOfUnits || post.noOfUnits,
        projectStatus: projectStatus || post.projectStatus,
        builder: builder || post.builder,
        totalLandArea: totalLandArea || post.totalLandArea,
        sizeRange: sizeRange || post.sizeRange,
        unitVariants: unitVariants || post.unitVariants,
        possessionTime: possessionTime || post.possessionTime,
        towersAndBlocks: towersAndBlocks || post.towersAndBlocks,
        reraNo: reraNo || post.reraNo,
        content: content || post.content,
        featureImage: uploadedImage || post.featureImage // Only update featureImage if a new image is uploaded
    };

    const updatedPost = await postModel.findOneAndUpdate({}, updatedPostData, { new: true });
    if (!updatedPost) {
        return res.status(403).json({ success: false, message: "Failed to update post" });
    };

    res.status(200).json({ success: true, message: "Post updated successfully", updatedPost });
})
