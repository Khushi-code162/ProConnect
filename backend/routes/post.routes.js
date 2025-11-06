import { Router } from "express";
import { activeCheck ,createPost, getAllPosts, deletePost, delete_comment_of_user,commentPost, get_comments_by_post, increment_likes} from "../controllers/posts.controllers.js";
import multer from "multer";

const router = Router();

const storage= multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null, 'upload/')
    },
    filename: (req,file, cb) =>{
        cb(null, file.originalname)
    },
})

const upload = multer({storage: storage})

router.route('/').get(activeCheck);
router.route("/post").post(upload.single('media'), createPost);
router.route("/posts").get(getAllPosts);
router.route("/delete_post").delete(deletePost);
router.route("/comment").post(commentPost);
router.route("/get_comments").get(get_comments_by_post);
router.route("/delete_comment").delete(delete_comment_of_user);
router.route("/increment_post_likes").post(increment_likes);


export default router;