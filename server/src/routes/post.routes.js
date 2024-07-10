import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostsByDateRange,
  searchPosts,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
} from "../controllers/post.controller";


const router = Router();


router.route("/post/create").post(verifyJWT, createPost);
router.route("/post/delete/:id").delete( verifyJWT, deletePost);
router.route("/post/getAll" ).get( getAllPosts);
router.route("/post/myPosts").get( verifyJWT, getMyPosts);
router.route("/post/getPostsByDateRange").get( verifyJWT, getPostsByDateRange);
router.route("/posts/search").get( searchPosts);
router.route("/posts/addToFavourites/:postId").put( verifyJWT, addToFavourites);
router.route("/posts/removeFromFavourites/:postId").put(verifyJWT,removeFromFavourites);
router.route("/posts/favourites" ).get(verifyJWT, getFavourites);

export default router;

