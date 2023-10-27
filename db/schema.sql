CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE Posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
INSERT INTO Users (username, password) VALUES ('john_doe', 'hashed_password');

INSERT INTO Posts (title, content, user_id) VALUES ('My First Post', 'This is the content of my first blog post.', 1);

SELECT * FROM Posts;

SELECT * FROM Posts WHERE user_id = 1;

UPDATE Users SET password = 'new_hashed_password' WHERE username = 'john_doe';

UPDATE Posts SET content = 'Updated content' WHERE id = 1;

DELETE FROM Users WHERE username = 'john_doe';

DELETE FROM Posts WHERE id = 1;

SELECT Posts.title, Posts.content, Users.username
FROM Posts
INNER JOIN Users ON Posts.user_id = Users.id;
