// Function to create new blog posts
async function newPostHandler(event) {
  event.preventDefault();

  const titleInput = document.querySelector("#titleInput");
  const bodyInput = document.querySelector("#bodyInput");

  const title = titleInput.value.trim();
  const description = bodyInput.value.trim();

  if (title && description) {
    try {
      const response = await fetch("/api/blogPost", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the blog post.");
    }
  }
}

// Event Listener for submitting a new blog post
const createBlogPostForm = document.querySelector(".createBlogPost");
if (createBlogPostForm) {
  createBlogPostForm.addEventListener("submit", newPostHandler);
}
