// Function to allow users to edit blog posts
async function submitEdit(event) {
  event.preventDefault();

  const blogPost = window.location.pathname.split("/");
  const blogPostId = blogPost[2];
  const titleInput = document.getElementById("titleInput");
  const bodyInput = document.getElementById("bodyInput");

  const title = titleInput.value.trim();
  const description = bodyInput.value.trim();

  if (title && description) {
    try {
      const response = await fetch(`/api/blogPost/${blogPostId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.assign("/dashboard");
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while editing the blog post.");
    }
  }
}

// Event Listener for submitting the edit
const submitButton = document.getElementById("submitEdit");
if (submitButton) {
  submitButton.addEventListener("click", submitEdit);
}
