const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BlogPost extends Model {}

// Define the BlogPost model
BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps (created_at, updated_at)
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use underscored names for fields (e.g., date_created)
    modelName: "blogPost", // Set the model name
  }
);

// Export the BlogPost model
module.exports = BlogPost;
