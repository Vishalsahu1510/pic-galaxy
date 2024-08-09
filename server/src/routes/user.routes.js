import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from '../middlewares/multer.middleware.js'
import {
        registerUser,
        loginUser,
        logoutUser,
        refreshAccessToken,
        switchProfile,
        changeCurrentPassword,
        getCurrentUser,
        updateUserDetails,
        updateUserAvatar 
        } from "../controllers/users.controller.js";

  const router = Router()

  router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]) ,
    registerUser
);
router.route("/login").post(upload.none(), loginUser);

//secured routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/switch-profile").get(verifyJWT, switchProfile);

router.route("/change-password").post(upload.none(), verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-user").patch(upload.none(), verifyJWT, updateUserDetails);
router.route("/update-avatar").patch(verifyJWT, upload.single('avatar'), updateUserAvatar);


export default router;
