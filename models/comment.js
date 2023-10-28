const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

// Define the Comment model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    blogPost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogPost",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps (created_at, updated_at)
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use underscored names for fields
    modelName: "comment", // Set the model name
  }
);

// Export the Comment model
module.exports = Comment;