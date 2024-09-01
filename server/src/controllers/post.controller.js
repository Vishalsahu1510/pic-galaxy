import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createPost = asyncHandler(async (req, res) => {
    const authorId = req.user._id;
    const authorAccountType = req.user.accountType;
    if (authorAccountType === "buyer") {
        throw new ApiError(400, "Forbidden, only sellers can post");
    }
    const { title, author, price, image, publicId } = req.body;

    const post = await Post.create({
        title,
        author,
        price,
        image,
        authorId,
        publicId
    });

    await User.findByIdAndUpdate(authorId, {
        $push: { uploads: post._id }
    });

    return res
        .status(201)
        .json(new ApiResponse(200, post, "Post created successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    const { authorId } = post;
    await User.findByIdAndUpdate(authorId, {
        $pull: { uploads: id }
    });
    await Post.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, "", "Post deleted successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find();
    if (posts.length === 0) {
        return res.status(200).json(new ApiResponse(200, "No posts found"));
    }

    return res.status(200).json(new ApiResponse(200, posts, "got all posts"));
});

const getMyPosts = asyncHandler(async (req, res) => {
    const authorId = req.user._id;

    const authorAccountType = req.user.accountType;

    if (authorAccountType === "buyer") {
        const { purchased } =
            await User.findById(authorId).populate("purchased");

        if (!purchased) {
            return res.status(404).json(new ApiResponse(404, "No posts found"));
        }

        return res.status(200).json(new ApiResponse(200, purchased));
    } else {
        const { uploads } = await User.findById(authorId).populate("uploads");
        if (!uploads) {
            return res.status(404).json(new ApiResponse(404, "No posts found"));
        }

        return res.status(200).json(new ApiResponse(200, uploads));
    }
});

const getPostsByDateRange = asyncHandler(async (req, res) => {
    const authorId = req.user._id;
    const authorAccountType = req.user.accountType;
    let data;

    if (authorAccountType === "buyer") {
        const { purchased } =
            await User.findById(authorId).populate("purchased");
        // console.log("purchased",purchased)
        data = purchased;
        // console.log("purchased",data)
    } else {
        const { uploads } = await User.findById(authorId).populate("uploads");
        data = uploads;
    }

    if (!data) {
        throw new ApiError(200, "No posts found");
    }

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const postsThisYear = data.filter(
        (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = data.filter(
        (post) => new Date(post.createdAt) >= startOfMonth
    );
    const postsThisWeek = data.filter(
        (post) => new Date(post.createdAt) >= startOfWeek
    );

    const PostsByDateRange = {
        tillNow: data,
        thisYear: postsThisYear,
        thisMonth: postsThisMonth,
        thisWeek: postsThisWeek
    };
    return res
        .status(200)
        .json(new ApiResponse(200, PostsByDateRange, "got posts by dateRange"));
});

const searchPosts = asyncHandler(async (req, res) => {
    const { search } = req.query;

    const posts = await Post.find({
        title: { $regex: search, $options: "i" }
    });
    if (posts.length === 0) {
        return res.status(200).json(new ApiResponse(200, "No posts found"));
    }
    return res.status(200).json(new ApiResponse(200, posts, "posts found"));
});

const addToFavourites = asyncHandler(async (req, res) => {
    const authorId = req.user._id;
    const { postId } = req.params;
    // console.log(postId)

    const user = await User.findById(authorId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const existingFavourite = user.favourites.includes(postId);
    if (existingFavourite) {
        return res
            .status(200)
            .json(new ApiResponse(200, "", "Post is already in favourites"));
    }

    await User.findByIdAndUpdate(authorId, {
        $push: { favourites: postId }
    });
    console.log(user);
    

    return res
        .status(200)
        .json(new ApiResponse(200, "", "Post added to favourites"));
});

const removeFromFavourites = asyncHandler(async (req, res) => {
    const authorId = req.user._id;
    const { postId } = req.params;

    const user = await User.findByIdAndUpdate(authorId, {
        $pull: { favourites: postId }
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "", "Post removed to favourites"));
});

const getFavourites = asyncHandler(async (req, res) => {
    const authorId = req.user._id;

    const { favourites } = await User.findById(authorId).populate("favourites");

    if (!favourites) {
        throw new ApiError(200, "No favourites found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, favourites, "Got all favourites successfully")
        );
});

export {
    createPost,
    deletePost,
    getAllPosts,
    getMyPosts,
    getPostsByDateRange,
    searchPosts,
    addToFavourites,
    removeFromFavourites,
    getFavourites
};
