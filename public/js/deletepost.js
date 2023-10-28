// Function to delete a blog post from the page
const deletePostHandler = async (event) => {
  event.preventDefault();
  const blogPostId = window.location.pathname.split("/")[2];

  try {
    const response = await fetch(`/api/blogPost/${blogPostId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting the blog post.");
  }
};

// Attach event listeners to delete buttons
const deleteButtons = document.querySelectorAll("#deleteBtn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deletePostHandler);
});
