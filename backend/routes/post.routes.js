import { Router } from "express";
import { activeCheck } from "../controllers/posts.controllers.js";


const router = Router();


router.route('/').get(activeCheck);

export default router;