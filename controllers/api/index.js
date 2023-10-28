const router = require("express").Router();

// Import route modules
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const commentRoutes = require("./commentRoutes");

// Attach route modules to their respective paths
router.use("/users", userRoutes);         // Routes for user-related actions
router.use("/blog-posts", blogPostRoutes); // Routes for blog post-related actions
router.use("/comments", commentRoutes);    // Routes for comment-related actions

module.exports = router;
