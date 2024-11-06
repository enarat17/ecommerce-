const BlogPost = require("../models/blogPostModel");
const factory = require("./FactoryHandlers");

exports.getAllBlogs = factory.getAll(BlogPost);
exports.updateBlog = factory.updateOne(BlogPost);
exports.deleteBlog = factory.deleteOne(BlogPost);
exports.getOneBlog = factory.getOne(BlogPost);
exports.createBlog = factory.createOne(BlogPost);
