import { Router } from "express";
import multer from "multer";

import {
  getAllUserProfile,
  login,
  register,
  uploadProfilePicture,
  getUserAndProfile,
  updateUserProfile,
  updateProfileData,
  downloadProfile,
  sendConnectionRequest,
  whatAreMyConnections,
  acceptConectionRequest,
  getMyConnectionRequests,
  getUserProfileBasedOnUsername
} from "../controllers/user.controller.js";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/update_profile_picture")
  .post(upload.single("profile_picture"), uploadProfilePicture);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/user/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume").get(downloadProfile);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/getConnectionsRequests").get(getMyConnectionRequests);
router.route("/user/user_connection_request").get(whatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptConectionRequest);
router.route('/user/get_profile_based_on_username').get(getUserProfileBasedOnUsername);

export default router;
