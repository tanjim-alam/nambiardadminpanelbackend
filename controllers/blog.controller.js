import asyncHandler from "express-async-handler";
import blogModel from "../models/blog.model.js";
import slugify from "slugify";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addBlog = asyncHandler(async (req, res) => {
    const { title, content, metaDescription } = req.body;
    if (!title || !content) {
        return res.status(405).json({ success: false, message: "Both fields are required" })
    };

    let uploadedImage;
    if (req.file) {
        const featureImage = req.file;
        uploadedImage = await uploadOnCloudinary(featureImage.path);
    }

    const blog = await blogModel.create({
        title,
        slug: slugify(title, { lower: true }),
        content,
        metaDescription,
        featureImage: uploadedImage
    });

    if (!blog) {
        return res.status(401).json({ success: false, message: "Something went wrong" })
    }
    res.status(200).json({
        success: true,
        message: "Blog added successfully",
        blog
    });
});


export const getAllBlog = asyncHandler(async (req, res) => {
    const blogs = await blogModel.find({});
    if (!blogs) {
        return res.status(401).json({ success: false, message: "Something went wrong" })
    }
    res.status(200).json({
        success: true,
        message: "Blog fetch successfully",
        blogs
    });
});

export const getBlog = asyncHandler(async (req, res) => {
    console.log("slug");
    const { slug } = req.params;
    console.log("slug", slug);
    if (!slug) {
        return res.status(404).json({ success: false, message: "Blog not found" })
    }
    const blog = await blogModel.findOne({ slug });
    if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" })
    }
    res.status(200).json({
        success: true,
        message: "Blog fetch successfully",
        blog
    });
});


export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, metaDescription } = req.body;
    if (!id) {
        return res.status(404).json({ success: false, message: "Blog not found" })
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" })
    }
    let uploadedImage;
    if (req.file) {
        const featureImage = req.file;
        uploadedImage = await uploadOnCloudinary(featureImage.path);
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(id, {
        title: title || blog.title,
        content: content || blog.content,
        metaDescription: metaDescription || blog.metaDescription,
        featureImage: uploadedImage || blog.featureImage,
    }, { new: true });

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        updatedBlog
    });

})