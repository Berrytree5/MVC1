// Imports
const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentData = require("./commentData.json");

// Function to seed the database with user data
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed the database with blogPost data
    for (const blogPost of blogPostData) {
      await BlogPost.create({
        ...blogPost,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    // Seed the database with comment data
    await Comment.bulkCreate(commentData);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    process.exit(0);
  }
};

// Call the seedDatabase function
seedDatabase();
