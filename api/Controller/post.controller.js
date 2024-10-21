import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.handler.js"

export const create = async (req, res, next) => {
     
    if (!req.user.isAdmin) {
        return next(errorHandler(403, " You are not allowed to create post"));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please fill in all fields"));
    }
    const slug = req.body.title.split(' ').join('_').toLowerCase().replace(/[^a-z0-9-]/g, '-');
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

export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDescription = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },

                ],
            }),
    }).sort({ updatedAt: sortDescription }).skip(startIndex).limit(limit);

        const totalPost = await Post.countDocuments();
        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );
        const lastMonthPost = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
           
        res.status(200).json({
            posts,
            totalPost,
            lastMonthPost,
    });


    }
    catch (error) {
          next(error);
    }
};

export const deletepost = async(req, res ,next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
         return  next(errorHandler(403,"Your are not allowed to delete this post"));
    }
    try{
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("Post deleted successfuly");
        
    }
    catch(error){
        next(error);
    }
};

export const  updatepost = async(req, res, next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,"Your are not allowed to  update this post"));

    }
  
    try {
          const updatePost = await Post.findByIdAndUpdate(req.params.postId,
         {
            $set: {
                title: req.body.title,
                category:req.body.category,
                content:req.body.content,
                image: req.body.image
            }
          },
          {new: true}
        );
        res.status(200).json(updatePost);
    } catch (error) {
        next(error);
    }
}
