const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new blog post with the user's ID
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Edit blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Update the blog post based on the provided ID
    const [rowsUpdated] = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rowsUpdated === 0) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json({ message: "Blog post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the blog post based on the provided ID
    const rowsDeleted = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsDeleted === 0) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
