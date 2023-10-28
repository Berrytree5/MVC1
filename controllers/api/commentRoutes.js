const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

// CREATE Comment
router.post("/", async (req, res) => {
  try {
    console.log("Creating a new comment");

    // Create a new comment
    const comment = await Comment.create({
      comment_body: req.body.comment_body,
      blogPost_id: req.body.blogPost_id,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// READ all Comments
router.get("/", async (req, res) => {
  try {
    console.log("Retrieving all comments");

    // Retrieve all comments with associated user and blog post details
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: BlogPost,
          attributes: ["id"],
        },
      ],
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Comment
router.put("/:id", async (req, res) => {
  try {
    console.log("Updating a comment");

    // Update a comment based on the provided ID
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedComment[0]) {
      res.status(400).json({ message: "No comment found with that id!" });
      return;
    }

    console.log("Comment updated!");
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting a comment");

    // Delete a comment based on the provided ID
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!comment) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
