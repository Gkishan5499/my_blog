import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.handler.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, " You are not allowed to create post"));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please fill in all fields"));
    }
    const slug = req.body.title.split(' ').join('_').toLowerCase().replace(/[^a-z0-9-]/g, ' ');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });
    try {
        const savePost = await newPost.save();
          res.status(201).json(savePost);
    } catch (error) {
        next(error);
    }
}
