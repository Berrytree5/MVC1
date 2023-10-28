// Function to post comments 
async function newComment(event) {
  event.preventDefault();

  const commentInput = document.getElementById("comment");
  const comment_body = commentInput.value.trim();

  const url = window.location.toString().split("/");
  const blogPost_id = url[url.length - 1];

  if (comment_body) {
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          blogPost_id,
          comment_body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while posting the comment.");
    } finally {
      // Clear the comment input
      commentInput.value = "";
    }
  }
}

// Event Listener for submitting a new comment
const commentForm = document.getElementById("comment-form");
if (commentForm) {
  commentForm.addEventListener("submit", newComment);
}
