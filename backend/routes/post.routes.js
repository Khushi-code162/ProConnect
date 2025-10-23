import { Router } from "express";
import { activeCheck ,createPost} from "../controllers/posts.controllers.js";
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


export default router;