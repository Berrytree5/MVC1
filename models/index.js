const User = require("./user");
const BlogPost = require("./blogPost");
const Comment = require("./comment");

// Set up relationships between tables 

// A user can have many blog posts, and a blog post belongs to a user
User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

// A user can have many comments, and a comment belongs to a user
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});


Comment.belongsTo(BlogPost, {
  foreignKey: "blogPost_id",
  onDelete: "CASCADE",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blogPost_id",
  onDelete: "CASCADE",
});

// Export the models
module.exports = { User, BlogPost, Comment };
